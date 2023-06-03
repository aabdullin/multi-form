class Form {
    constructor(selector) {
        this.fields = [];
        this.form = document.querySelector(selector);
        this.addField = this.addField.bind(this);
        this.validate = this.validate.bind(this);
    }

    addField(selector, validator) {
        const element = document.querySelector(selector);
        this.fields.push({
            element,
            validator,
        });
    }

    init() {
        this.form.addEventListener('submit', this.validate);
    }

    validate(e) {
        e.preventDefault();
        console.log('Validate');
        this.fields.forEach((item) => { //{ element, validator }
            item.validator(item.element)
        })
    }
};

const validator = (input) => {
    if (!input.value) {
        input.parentElement.classList.add('error');
    } else {
        input.parentElement.classList.remove('error');
        if (input.type === 'email') {
            if (validateEmail(input.value)) {
                input.parentElement.classList.remove('error')
            } else {
                input.parentElement.classList.add('error')
            }
        }
    }
}

function validateEmail (email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase())
}

const form = new Form('.form-container form');
form.addField('#first_name', validator);
form.addField('#last_name', validator);
form.addField('#email', validator);
form.addField('#password', validator);
form.init();
