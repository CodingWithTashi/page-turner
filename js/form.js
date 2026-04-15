/**
 *  - Validates on blur (when the user leaves a field)
 *  - Re-validates on input once an error is already showing (live clearing)
 *  - Full re-validation on submit before allowing success state
 *  - No reliance on HTML5 `required` attribute alone
 */

var rules = {
  name: {
    validate: function (v) { return v.trim().length >= 2; },
    message:  'Full name must be at least 2 characters.'
  },
  email: {
    validate: function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
    },
    message: 'Please enter a valid email address.'
  },
  genre: {
    validate: function (v) { return v !== ''; },
    message:  'Please select a preferred genre.'
  },
  city: {
    validate: function (v) { return v.trim().length >= 2; },
    message:  'Please enter your city (at least 2 characters).'
  }
};

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function showError(fieldId, message) {
  var group = document.getElementById('group-' + fieldId);
  var error = document.getElementById('error-' + fieldId);
  if (group) group.classList.add('has-error');
  if (error) error.textContent = message;
}

function clearError(fieldId) {
  var group = document.getElementById('group-' + fieldId);
  var error = document.getElementById('error-' + fieldId);
  if (group) group.classList.remove('has-error');
  if (error) error.textContent = '';
}

/**
 * Validates a single field by its id.
 * Returns true if valid, false if not.
 */
function validateField(fieldId) {
  var field = document.getElementById(fieldId);
  var rule  = rules[fieldId];

  if (!field || !rule) return true;

  if (rule.validate(field.value)) {
    clearError(fieldId);
    return true;
  }

  showError(fieldId, rule.message);
  return false;
}

/*  Attach Per-Field Listeners  */

var requiredFields = ['name', 'email', 'genre', 'city'];

requiredFields.forEach(function (id) {
  var field = document.getElementById(id);
  if (!field) return;

  /* Validate when the field loses focus */
  field.addEventListener('blur', function () {
    validateField(id);
  });

  /* Live-clear error as the user fixes the field */
  field.addEventListener('input', function () {
    var group = document.getElementById('group-' + id);
    if (group && group.classList.contains('has-error')) {
      validateField(id);
    }
  });

  /* select elements fire 'change', not 'input' */
  if (field.tagName === 'SELECT') {
    field.addEventListener('change', function () {
      validateField(id);
    });
  }
});

/*  Submit Handler */

var form = document.getElementById('join-form');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Validate all required fields and collect results */
    var allValid = requiredFields
      .map(function (id) { return validateField(id); })
      .every(function (result) { return result === true; });

    if (!allValid) {
      /* Focus the first field with an error */
      var firstError = form.querySelector('.has-error input, .has-error select');
      if (firstError) firstError.focus();
      return;
    }

    /* All valid — show success state */
    var formWrap     = document.getElementById('form-wrap');
    var successState = document.getElementById('success-state');

    if (formWrap)     formWrap.style.display     = 'none';
    if (successState) successState.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
