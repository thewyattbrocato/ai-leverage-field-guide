/*
 * AI Leverage Field Guide — progressive enhancement interactions.
 *
 * Plain JavaScript. No dependencies. No network requests.
 * Every feature is guarded: an initializer exits when its root element
 * is missing, and each initializer runs inside its own try/catch so a
 * failure in one interaction never breaks the rest of the page.
 *
 * Storage keys are namespaced and versioned:
 *   ai-leverage-field-guide:path:v1
 *   ai-leverage-field-guide:progress:v1
 */
(function () {
  "use strict";

  var STORAGE_PREFIX = "ai-leverage-field-guide";
  var PATH_KEY = STORAGE_PREFIX + ":path:v1";
  var PROGRESS_KEY = STORAGE_PREFIX + ":progress:v1";
  var SCHEMA_VERSION = 1;

  /* ------------------------------------------------------------------ *
   * Small helpers
   * ------------------------------------------------------------------ */

  function readNamespacedJson(key) {
    try {
      var raw = window.localStorage.getItem(key);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return null;
      }
      if (parsed.schemaVersion !== SCHEMA_VERSION) return null;
      return parsed;
    } catch (err) {
      return null;
    }
  }

  function writeNamespacedJson(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  }

  function removeNamespacedKey(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (err) {
      return false;
    }
  }

  /* One shared polite live region per page for transient announcements. */
  function getLiveRegion() {
    var region = document.getElementById("alfg-live-status");
    if (!region) {
      region = document.createElement("p");
      region.id = "alfg-live-status";
      region.className = "sr-only";
      region.setAttribute("role", "status");
      document.body.appendChild(region);
    }
    return region;
  }

  /* The whole page must use a single live channel. Pages that already own a
     status region (the builder's #sc-status, the curriculum's
     #progress-message) reuse it; only pages without one fall back to the
     shared #alfg-live-status element, which is therefore created at most once
     per page. This prevents a second live region from spawning double speech. */
  function getPrimaryLiveRegion() {
    var existing = document.querySelector("#sc-status, #progress-message");
    if (existing) return existing;
    return getLiveRegion();
  }

  function announce(message) {
    var region = getPrimaryLiveRegion();
    region.textContent = "";
    window.setTimeout(function () {
      region.textContent = message;
    }, 60);
  }

  function safeFileName(text, fallback) {
    var slug = String(text)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48);
    return slug || fallback;
  }

  function todayStamp() {
    var now = new Date();
    var month = String(now.getMonth() + 1).padStart(2, "0");
    var day = String(now.getDate()).padStart(2, "0");
    return now.getFullYear() + "-" + month + "-" + day;
  }

  function triggerDownload(fileName, text, mimeType) {
    var blob = new Blob([text], { type: mimeType });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  /* Clipboard with execCommand fallback for older browsers / denied permission. */
  function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(
        function () {
          return true;
        },
        function () {
          return copyViaExecCommand(text);
        }
      );
    }
    return Promise.resolve(copyViaExecCommand(text));
  }

  function copyViaExecCommand(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.className = "copy-fallback";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    var succeeded = false;
    try {
      succeeded = document.execCommand("copy");
    } catch (err) {
      succeeded = false;
    }
    document.body.removeChild(textarea);
    return succeeded;
  }

  /* ------------------------------------------------------------------ *
   * Feature: Choose Your Path (index.html)
   * ------------------------------------------------------------------ */

  var PATHS = {
    manager: {
      label: "Manager",
      guide: { href: "leverage-loop.html", title: "The Leverage Loop" },
      outcome: "A decision loop you run on real decisions.",
      nextStep: "Read The Leverage Loop, then run Maker-Checker on one live decision this week.",
    },
    writer: {
      label: "Writer",
      guide: { href: "leverage-loop.html", title: "The Leverage Loop" },
      outcome: "A draft → edit → publish pipeline that keeps your voice.",
      nextStep: "Run the loop once on a piece you are publishing this week; save your corrections as a recurring prompt.",
    },
    operator: {
      label: "Operator",
      guide: { href: "stop-conditions.html", title: "Stop Conditions" },
      outcome: "A status → follow-up → handoff rhythm that stops dropped threads.",
      nextStep: "Write stop conditions for this week's status update before you draft it — the builder below makes it a two-minute job.",
    },
    knowledge: {
      label: "Knowledge Worker",
      guide: { href: "leverage-loop.html", title: "The Leverage Loop" },
      outcome: "A research → synthesis → brief pipeline you can reuse.",
      nextStep: "Capture one messy research task and run the loop on it twice this week.",
    },
    generalist: {
      label: "Generalist",
      guide: { href: "curriculum.html", title: "The 10-Week Curriculum" },
      outcome: "The complete foundation before you specialize.",
      nextStep: "Read The Leverage Loop, then start Module 1 with the leverage map exercise.",
    },
  };

  function initPathPicker() {
    var root = document.querySelector("[data-path-picker]");
    if (!root) return;

    var buttons = Array.prototype.slice.call(root.querySelectorAll("[data-path-option]"));
    if (!buttons.length) return;

    /* The buttons ship disabled so no-JS visitors see honest, inert controls;
       JavaScript arriving means they can be enabled. */
    buttons.forEach(function (button) {
      button.disabled = false;
    });

    var recommendation = root.querySelector("[data-path-recommendation]");
    var resetButton = root.querySelector("[data-path-reset]");
    var guideLink = root.querySelector("[data-rec-guide-link]");
    var outcomeTarget = root.querySelector("[data-rec-outcome]");
    var nextStepTarget = root.querySelector("[data-rec-next-step]");
    var savedNote = root.querySelector("[data-rec-saved-note]");

    /* Radiogroup pattern: exactly one tab stop, arrow keys move both focus
       and selection, and the only way to clear is the explicit Clear control. */
    function setRovingTabindex(selectedIndex) {
      buttons.forEach(function (button, index) {
        button.tabIndex = index === selectedIndex ? 0 : -1;
      });
    }

    function applySelection(pathId, options) {
      var data = PATHS[pathId];
      if (!data) return;

      var selectedIndex = 0;
      buttons.forEach(function (button, index) {
        var isSelected = button.getAttribute("data-path-option") === pathId;
        if (isSelected) selectedIndex = index;
        button.setAttribute("aria-checked", isSelected ? "true" : "false");
        button.classList.toggle("is-selected", isSelected);
        var stateLabel = button.querySelector(".path-option-state");
        if (stateLabel) {
          stateLabel.textContent = isSelected ? "Selected ✓" : "";
        }
      });
      setRovingTabindex(selectedIndex);

      if (recommendation && guideLink && outcomeTarget && nextStepTarget) {
        guideLink.href = data.guide.href;
        guideLink.textContent = data.guide.title;
        outcomeTarget.textContent = data.outcome;
        nextStepTarget.textContent = data.nextStep;
        recommendation.hidden = false;
      }
      if (resetButton) resetButton.hidden = false;
      if (savedNote) savedNote.hidden = false;

      if (!options || !options.skipSave) {
        var saved = writeNamespacedJson(PATH_KEY, {
          schemaVersion: SCHEMA_VERSION,
          selectedPath: pathId,
          savedAt: new Date().toISOString(),
        });
        if (options && options.announceSelection) {
          announce(saved
            ? data.label + " path saved in this browser."
            : "Path set to " + data.label + ", but this browser blocked saving.");
        }
      }
    }

    function clearSelection(options) {
      removeNamespacedKey(PATH_KEY);
      buttons.forEach(function (button) {
        button.setAttribute("aria-checked", "false");
        button.classList.remove("is-selected");
        var stateLabel = button.querySelector(".path-option-state");
        if (stateLabel) stateLabel.textContent = "";
      });
      setRovingTabindex(0);
      if (recommendation) recommendation.hidden = true;
      if (resetButton) resetButton.hidden = true;
      if (savedNote) savedNote.hidden = true;
      if (!options || !options.silent) {
        announce("Path selection cleared.");
      }
      /* Return focus into the picker (not the now-hidden reset button) so
         keyboard users stay oriented. */
      if (options && options.focusStart && buttons.length) {
        buttons[0].focus();
      }
    }

    buttons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        applySelection(button.getAttribute("data-path-option"), { announceSelection: true });
      });
      button.addEventListener("keydown", function (event) {
        var nextIndex = null;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          nextIndex = (index + 1) % buttons.length;
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          nextIndex = (index - 1 + buttons.length) % buttons.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = buttons.length - 1;
        }
        if (nextIndex === null) return;
        event.preventDefault();
        var target = buttons[nextIndex];
        target.focus();
        applySelection(target.getAttribute("data-path-option"), { announceSelection: true });
      });
    });

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        clearSelection({ focusStart: true });
      });
    }

    /* Restore previous choice, ignoring anything malformed or unknown. */
    var stored = readNamespacedJson(PATH_KEY);
    if (stored && Object.prototype.hasOwnProperty.call(PATHS, stored.selectedPath)) {
      applySelection(stored.selectedPath, { skipSave: true });
    }
  }

  /* ------------------------------------------------------------------ *
   * Shared milestone marking (progress storage).
   * The path picker never writes progress; the curriculum page derives
   * "role track selected" from the path key at display time instead.
   * ------------------------------------------------------------------ */

  var MILESTONES = [
    { id: "leverage-map", label: "Leverage map completed" },
    { id: "loop-three-runs", label: "Leverage Loop run three times" },
    { id: "first-recurring-prompt", label: "First recurring prompt saved" },
    { id: "stop-conditions-three", label: "Three stop conditions written" },
    { id: "maker-checker-review", label: "Maker-Checker review completed" },
    { id: "role-track-selected", label: "Role track selected" },
    { id: "track-project-completed", label: "Track project completed" },
    { id: "retrospective-completed", label: "Retrospective completed" },
  ];

  function milestoneExists(id) {
    return MILESTONES.some(function (milestone) {
      return milestone.id === id;
    });
  }

  function readProgressData() {
    var data = readNamespacedJson(PROGRESS_KEY);
    if (!data) return null;
    if (!data.milestones || typeof data.milestones !== "object") return null;
    return data;
  }

  /* "Role track selected" is derived, never stored by the picker: it is
     true whenever the path key holds a known selection. */
  function pathSelectionActive() {
    var storedPath = readNamespacedJson(PATH_KEY);
    return Boolean(
      storedPath &&
        Object.prototype.hasOwnProperty.call(PATHS, storedPath.selectedPath)
    );
  }

  function applyDerivedRoleTrack(checkboxes) {
    if (!pathSelectionActive()) return false;
    var applied = false;
    Array.prototype.forEach.call(checkboxes, function (checkbox) {
      if (checkbox.getAttribute("data-milestone-id") === "role-track-selected") {
        checkbox.checked = true;
        applied = true;
      }
    });
    return applied;
  }

  /* ------------------------------------------------------------------ *
   * Feature: Stop Condition Builder (stop-conditions.html)
   * ------------------------------------------------------------------ */

  var WORK_TYPES = [
    "Status update",
    "Email or follow-up",
    "Brief or strategy memo",
    "Research summary",
    "Meeting preparation",
    "Decision document",
    "Other",
  ];

  function initStopConditionBuilder() {
    var form = document.getElementById("stop-condition-form");
    if (!form) return;

    /* The form's buttons ship disabled so no-JS visitors can neither submit
       (page reload with query params) nor click a dead Clear. */
    Array.prototype.forEach.call(form.querySelectorAll("button"), function (button) {
      button.disabled = false;
    });

    var fields = {
      workType: form.querySelector("#sc-work-type"),
      outcome: form.querySelector("#sc-outcome"),
      evidence: form.querySelector("#sc-evidence"),
      failure: form.querySelector("#sc-failure-condition"),
      risk: form.querySelector("#sc-real-risk"),
    };
    var requiredFields = [fields.workType, fields.outcome, fields.evidence, fields.failure, fields.risk];

    var outputRegion = document.getElementById("sc-output-region");
    var outputArea = document.getElementById("sc-output");
    var statusRegion = document.getElementById("sc-status");
    var copyButton = document.getElementById("sc-copy");
    var downloadButton = document.getElementById("sc-download");

    function findErrorElement(field) {
      var describedIds = (field.getAttribute("aria-describedby") || "").split(/\s+/);
      var errorEl = null;
      describedIds.some(function (id) {
        if (!id) return false;
        var candidate = document.getElementById(id);
        if (candidate && candidate.classList.contains("field-error")) {
          errorEl = candidate;
          return true;
        }
        return false;
      });
      return errorEl;
    }

    function showError(field, message) {
      var errorEl = findErrorElement(field);
      field.setAttribute("aria-invalid", "true");
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.hidden = false;
      }
    }

    function clearErrors() {
      requiredFields.forEach(function (field) {
        if (!field) return;
        field.removeAttribute("aria-invalid");
        var errorEl = findErrorElement(field);
        if (errorEl) {
          errorEl.textContent = "";
          errorEl.hidden = true;
        }
      });
    }

    /* Prefer an explicit data-label; otherwise derive a friendly name from
       the field's <label for>. This keeps validation messages readable when
       the author has not supplied an explicit override. */
    function getFieldLabel(field) {
      var explicit = field.getAttribute("data-label");
      if (explicit) return explicit;
      if (!field.id) return "This field";
      var label = document.querySelector('label[for="' + field.id + '"]');
      if (!label) return "This field";
      var clone = label.cloneNode(true);
      var removeables = clone.querySelectorAll(".required-marker, .sr-only");
      Array.prototype.forEach.call(removeables, function (removeable) {
        if (removeable.parentNode) removeable.parentNode.removeChild(removeable);
      });
      var text = (clone.textContent || "")
        .replace(/\*/g, "")
        .replace(/\(required\)/gi, "")
        .trim();
      return text || "This field";
    }

    function validate() {
      clearErrors();
      var firstInvalid = null;
      requiredFields.forEach(function (field) {
        if (!field) return;
        var value = field.value.trim();
        if (!value) {
          showError(field, getFieldLabel(field) + " is required.");
          if (!firstInvalid) firstInvalid = field;
        }
      });
      return firstInvalid;
    }

    /* User free-text may start a line with Markdown block metacharacters
        ("#" heading, ">" blockquote, "-" / "*" / "_" horizontal rule,
        "=" setext heading) that a downstream renderer would re-interpret and
        corrupt the document (this bites the unprefixed fields, e.g. the
        intended-outcome, most directly). Escape the leading character so the
        generated Markdown is safe to paste anywhere as literal text. */
    function escapeMarkdownLineStart(text) {
      return String(text).replace(/^([#>*_=+\-])/, "\\$1");
    }

    function buildMarkdown(values) {
      var lines = [
        "# Stop condition — " + values.workType,
        "",
        "_Written before starting the work. Check against it like a checklist, not a vibe._",
        "",
        "## Intended outcome",
      ];
      values.outcome.split(/\r?\n/).forEach(function (line) {
        var trimmed = line.trim();
        if (trimmed) lines.push(escapeMarkdownLineStart(trimmed));
      });
      lines.push("");
      lines.push("## Evidence required (observable)");
      lines.push("Someone other than me can verify each item:");
      values.evidence.split(/\r?\n/).forEach(function (line) {
        var trimmed = line.trim();
        if (trimmed) lines.push("- [ ] " + escapeMarkdownLineStart(trimmed));
      });
      lines.push("");
      lines.push("## Clear failure condition (falsifiable)");
      lines.push("This stop condition FAILS if any of the following is true:");
      values.failure.split(/\r?\n/).forEach(function (line) {
        var trimmed = line.trim();
        if (trimmed) lines.push("- " + escapeMarkdownLineStart(trimmed));
      });
      lines.push("");
      lines.push("## Real risk");
      lines.push("What actually goes wrong if this passes but the work is bad:");
      values.risk.split(/\r?\n/).forEach(function (line) {
        var trimmed = line.trim();
        if (trimmed) lines.push("- " + escapeMarkdownLineStart(trimmed));
      });
      lines.push("");
      lines.push("---");
      lines.push("Observable: the evidence above can be checked by someone else.");
      lines.push("Falsifiable: the failure condition above clearly fails the work.");
      lines.push("Real risk: the risk above names the actual consequence, not a proxy metric.");
      lines.push("");
      lines.push("Ship only when every box checks out. Otherwise rewrite the work, not the criteria.");
      return lines.join("\n");
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var firstInvalid = validate();
      if (firstInvalid) {
        firstInvalid.focus();
        setStatus("Fix the highlighted fields to generate your stop condition.", true);
        return;
      }

      var values = {
        workType: fields.workType.value.trim(),
        outcome: fields.outcome.value.trim(),
        evidence: fields.evidence.value.trim(),
        failure: fields.failure.value.trim(),
        risk: fields.risk.value.trim(),
      };

      outputArea.value = buildMarkdown(values);
      outputRegion.hidden = false;
      /* #sc-status is role="status" and already carries this message;
          announcing separately would make screen readers speak twice. */
      setStatus("Stop condition generated. Copy it into your task notes before starting the work.", false);
      /* Drop focus onto the generated result so keyboard and screen-reader
          users land on the output (not stranded on the Generate button) and
          can Tab straight to Copy / Download. */
      if (outputArea) outputArea.focus();

      var generateButton = form.querySelector('button[type="submit"]');
      if (generateButton) generateButton.classList.add("is-generated");
    });

    function setStatus(message, isError) {
      if (!statusRegion) return;
      statusRegion.textContent = message;
      statusRegion.classList.toggle("form-status--error", Boolean(isError));
      statusRegion.hidden = !message;
    }

    if (copyButton) {
      copyButton.addEventListener("click", function () {
        if (!outputArea || !outputArea.value) {
          setStatus("Generate a stop condition first, then copy it.", true);
          return;
        }
        copyTextToClipboard(outputArea.value).then(function (ok) {
          if (ok) {
            setStatus("Markdown copied to your clipboard.", false);
          } else {
            setStatus("Copy failed — select the text in the box and copy it manually.", true);
          }
        });
      });
    }

    if (downloadButton) {
      downloadButton.addEventListener("click", function () {
        if (!outputArea || !outputArea.value) {
          setStatus("Generate a stop condition first, then download it.", true);
          return;
        }
        var fileName =
          "stop-condition-" + safeFileName(fields.workType.value, "task") + "-" + todayStamp() + ".md";
        triggerDownload(fileName, outputArea.value, "text/markdown");
        setStatus("Downloaded as " + fileName, false);
      });
    }

    var clearButton = form.querySelector('[data-action="clear-builder"]');
    if (clearButton) {
      clearButton.addEventListener("click", function () {
        form.reset();
        clearErrors();
        if (outputArea) outputArea.value = "";
        if (outputRegion) outputRegion.hidden = true;
        /* Use the builder's single live channel (#sc-status). announce()
           would write to a second region and make screen readers speak twice. */
        setStatus("Builder cleared.", false);
        var generateButton = form.querySelector('button[type="submit"]');
        if (generateButton) generateButton.classList.remove("is-generated");
        if (fields.workType) fields.workType.focus();
      });
    }

    /* Populate the work-type select from the shared list. */
    if (fields.workType && fields.workType.children.length <= 1) {
      WORK_TYPES.forEach(function (workType) {
        var option = document.createElement("option");
        option.value = workType;
        option.textContent = workType;
        fields.workType.appendChild(option);
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * Feature: Local progress tracking (curriculum.html)
   * ------------------------------------------------------------------ */

  function updateProgressSummary() {
    var checkboxes = document.querySelectorAll("[data-progress-tracker] [data-milestone-id]");
    if (!checkboxes.length) return;
    var total = checkboxes.length;
    var done = 0;
    Array.prototype.forEach.call(checkboxes, function (checkbox) {
      if (checkbox.checked) done += 1;
    });
    var percent = total === 0 ? 0 : Math.round((done / total) * 100);

    var summary = document.querySelector("[data-progress-summary]");
    if (summary) {
      summary.textContent = done + " of " + total + " complete (" + percent + "%)";
    }
    var bar = document.querySelector("[data-progress-bar]");
    if (bar) {
      bar.setAttribute("max", String(total));
      bar.setAttribute("value", String(done));
      bar.value = done;
      bar.max = total;
    }
  }

  function progressMessage(text, isError) {
    var el = document.getElementById("progress-message");
    if (!el) return;
    el.textContent = text;
    el.hidden = !text;
    el.classList.toggle("field-error", Boolean(isError));
    el.classList.toggle("form-status", !isError);
  }

  function initProgressTracker() {
    var tracker = document.querySelector("[data-progress-tracker]");
    if (!tracker) return;

    var checkboxes = Array.prototype.slice.call(tracker.querySelectorAll("[data-milestone-id]"));

    function collectState() {
      var milestones = {};
      checkboxes.forEach(function (checkbox) {
        var id = checkbox.getAttribute("data-milestone-id");
        if (id === "role-track-selected") return;
        if (checkbox.checked) milestones[id] = true;
      });
      return milestones;
    }

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        progressMessage("", false);
        writeNamespacedJson(PROGRESS_KEY, {
          schemaVersion: SCHEMA_VERSION,
          milestones: collectState(),
        });
        applyDerivedRoleTrack(checkboxes);
        updateProgressSummary();
      });
    });

    var exportButton = document.getElementById("progress-export");
    if (exportButton) {
      exportButton.addEventListener("click", function () {
        var milestones = collectState();
        var payload = {
          schemaVersion: SCHEMA_VERSION,
          app: STORAGE_PREFIX,
          exportedAt: new Date().toISOString(),
          milestones: MILESTONES.map(function (milestone) {
            return {
              id: milestone.id,
              label: milestone.label,
              complete: milestones[milestone.id] === true,
            };
          }),
        };
        triggerDownload(
          "ai-leverage-field-guide-progress-" + todayStamp() + ".json",
          JSON.stringify(payload, null, 2),
          "application/json"
        );
        progressMessage("Progress exported as JSON.", false);
      });
    }

    var importInput = document.getElementById("progress-import");
    if (importInput) {
      importInput.addEventListener("change", function () {
        var file = importInput.files && importInput.files[0];
        if (!file) return;

        var reader = new FileReader();
        reader.onload = function () {
          var imported = null;
          try {
            imported = JSON.parse(String(reader.result));
          } catch (err) {
            imported = null;
          }

          if (!imported || typeof imported !== "object" || Array.isArray(imported)) {
            progressMessage(
              'Import failed: "' + file.name + '" is not valid progress JSON. No changes were made.',
              true
            );
            importInput.value = "";
            return;
          }

          /* Accept numeric-equivalent strings ("1") for data-portability
             while keeping every other validation strict. */
          var importVersion = imported.schemaVersion;
          var versionSupported =
            importVersion === SCHEMA_VERSION ||
            (typeof importVersion === "string" &&
              importVersion.trim() !== "" &&
              Number(importVersion) === SCHEMA_VERSION);

          if (!versionSupported) {
            progressMessage(
              "Import failed: unsupported format version (" +
                (importVersion === undefined ? "missing" : importVersion) +
                "). Expected version " + SCHEMA_VERSION + ". No changes were made.",
              true
            );
            importInput.value = "";
            return;
          }

          var rawMilestones = imported.milestones;
          var normalized = null;

          if (Array.isArray(rawMilestones)) {
            /* Export format: [{ id, label, complete }] */
            normalized = {};
            rawMilestones.forEach(function (entry) {
              if (!entry || typeof entry !== "object") return;
              normalized[entry.id] = entry.complete === true;
            });
          } else if (rawMilestones && typeof rawMilestones === "object") {
            /* Compact format: { id: true } */
            normalized = rawMilestones;
          }

          if (!normalized || Object.keys(normalized).length === 0) {
            progressMessage("Import failed: no milestones found in the file. No changes were made.", true);
            importInput.value = "";
            return;
          }

          var unknownIds = Object.keys(normalized).filter(function (id) {
            return !milestoneExists(id);
          });

          if (unknownIds.length > 0) {
            progressMessage(
              "Import failed: unrecognized milestone \"" + unknownIds[0] + "\". No changes were made.",
              true
            );
            importInput.value = "";
            return;
          }

          var applied = {};
          checkboxes.forEach(function (checkbox) {
            var id = checkbox.getAttribute("data-milestone-id");
            /* Derived milestones are never imported or stored: the display
               is owned solely by the path key (applyDerivedRoleTrack below). */
            if (id === "role-track-selected") return;
            var isDone = normalized[id] === true;
            checkbox.checked = isDone;
            if (isDone) applied[id] = true;
          });
          applyDerivedRoleTrack(checkboxes);

          writeNamespacedJson(PROGRESS_KEY, {
            schemaVersion: SCHEMA_VERSION,
            milestones: applied,
          });
          updateProgressSummary();
          progressMessage("Progress imported from " + file.name + ".", false);
          importInput.value = "";
        };

        reader.onerror = function () {
          progressMessage("Import failed: the file could not be read. No changes were made.", true);
          importInput.value = "";
        };

        reader.readAsText(file);
      });
    }

    var resetButton = document.getElementById("progress-reset");
    if (resetButton) {
      resetButton.addEventListener("click", function () {
        var confirmed = window.confirm(
          "Reset all curriculum progress stored in this browser? This cannot be undone."
        );
        if (!confirmed) {
          progressMessage("Reset cancelled. Progress unchanged.", false);
          return;
        }
        removeNamespacedKey(PROGRESS_KEY);
        checkboxes.forEach(function (checkbox) {
          checkbox.checked = false;
        });
        applyDerivedRoleTrack(checkboxes);
        updateProgressSummary();
        progressMessage("Progress cleared from this browser.", false);
      });
    }

    /* Restore previously saved progress on load. The derived role-track
       milestone is overlaid from the path key, not read from storage. */
    var stored = readProgressData();
    if (stored) {
      checkboxes.forEach(function (checkbox) {
        var id = checkbox.getAttribute("data-milestone-id");
        if (id === "role-track-selected") return;
        checkbox.checked = stored.milestones[id] === true;
      });
    }
    applyDerivedRoleTrack(checkboxes);
    updateProgressSummary();
  }

  /* ------------------------------------------------------------------ *
   * Feature: Copy-to-clipboard buttons (template blocks)
   * ------------------------------------------------------------------ */

  function initCopyButtons() {
    var buttons = document.querySelectorAll("[data-copy-target]");
    if (!buttons.length) return;

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener("click", function () {
        var targetSelector = button.getAttribute("data-copy-target");
        var target = targetSelector ? document.querySelector(targetSelector) : null;
        if (!target) return;

        var sourceText = typeof target.value === "string" ? target.value : target.textContent;
        var successMessage = button.getAttribute("data-copy-success") || "Copied to clipboard.";

        copyTextToClipboard(sourceText).then(function (ok) {
          announce(ok ? successMessage : "Copy failed — select the text and copy it manually.");
          button.classList.add(ok ? "is-copied" : "is-error");
          var originalTitle = button.textContent;
          button.textContent = ok ? "Copied ✓" : "Copy failed";
          window.setTimeout(function () {
            button.textContent = originalTitle;
            button.classList.remove("is-copied");
            button.classList.remove("is-error");
          }, 2000);
        });
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Boot
   * ------------------------------------------------------------------ */

  function initAllFeatures() {
    [initPathPicker, initStopConditionBuilder, initProgressTracker, initCopyButtons].forEach(
      function (initFeature) {
        try {
          initFeature();
        } catch (err) {
          /* One broken feature must never take down the page. */
          if (window.console && window.console.warn) {
            window.console.warn("AI Leverage Field Guide: feature failed to initialize:", err);
          }
        }
      }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllFeatures);
  } else {
    initAllFeatures();
  }
})();
