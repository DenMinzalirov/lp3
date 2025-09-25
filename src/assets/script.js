$(window).on('load', function() {
    $('.loaderWrapper').fadeOut();

    $('.intro .logo').addClass('animate');
    $('.intro .chickens').addClass('animate');

    function handleAgreement() {
        $('.agreement .checkbox').on('click', function() {
            $(this).toggleClass('active');
        });

        $('.agreement span').on('click', function() {
            $(this).closest('label').find('.checkbox').toggleClass('active');
        });
    }

    handleAgreement();

    function validateForm() {
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        let emailValid = false;
        let passwordValid = false;

        const emailErrorEl = $('#email').closest('.group').find('.error');
        if (email === '') {
            emailErrorEl.text("Darf nicht leer sein").show();
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailErrorEl.text("Geben Sie eine korrekte E-Mail-Adresse ein").show();
        } else {
            emailErrorEl.hide();
            emailValid = true;
        }

        const passwordErrorEl = $('#password').closest('.group').find('.error');
        if (password === '') {
            passwordErrorEl.text("Darf nicht leer sein").show();
        } else {
            passwordErrorEl.hide();
            passwordValid = true;
        }

        if (emailValid && passwordValid) {
            $('.button').attr('disabled', false);
        } else {
            $('.button').attr('disabled', true);
        }
    }

    $('#email, #password, #yearsold').on('input change', validateForm);

    function handleModal() {
        $('.modal .close').on('click', function() {
            $('.modal').fadeOut();
        });

        $('.intro .buttonWrapper .button').on('click', function() {
            $('.modal').fadeIn().css({'display':'flex'});
        });
    }

    handleModal();
});