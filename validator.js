// Logical Hanlder
function Validator(options) {

    var formElement = document.querySelector(options.form)

    // validate value
    function message(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(".error-message")

        var errorMessage = rule.test(inputElement.value)

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.classList.add("invalid")
        } else {
            errorElement.innerText = ""
            inputElement.classList.remove("invalid")
            inputElement.classList.add("valid")
        }
    }

    // Logic of rules
    if (formElement) {

        options.rules.forEach(function (rule) {

            var inputElement = formElement.querySelector(rule.selector)

            if (inputElement) {
                // onblur hanlder
                inputElement.onblur = function () {
                    message(inputElement, rule)
                }

                // typing handler
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(".error-message")
                    errorElement.innerText = ""
                    errorElement.parentElement.classList.remove("invalid")
                }
            }

        })

    }

}

// Define each rule

// Check if a field is empty or not
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : "Không để trống trường này"
        }
    }
}

// Check if an email is valid
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

            return regex.test(value) ? undefined : "Trường này phải là email"
        }
    }
}