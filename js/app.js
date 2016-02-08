$(function() {
    var $form = $('#signup-form');
    $('.signup').click(function() {
        var clazz = $(this).data('class');

        var $checkbox = $form.find('input[name=class][value='+clazz+']')

        if (!$checkbox.prop('disabled'))
            $checkbox.prop('checked', true);
        $form.find('input[name=full_name]').focus();
    });

    $form.submit(function(e) {
        var full_name = $form.find('input[name=full_name]').val();
        var phone = $form.find('input[name=phone]').val();
        var clazz = $form.find('input[name=class]').val();

        var clean_phone = phone;

        if (phone.length > 0) {
            clean_phone = phone.match(/\d/g).join("");
        }

        $form.find('#phone-error').hide();
        $form.find('input[name=phone]').removeClass('error');

        if (clean_phone.length > 0 && (clean_phone.length <= 9 || clean_phone.length >= 12)) {
            $form.find('input[name=phone]').addClass('error');
            $form.find('#phone-error').show();
        }

        var reminders = $form.find('input[name=reminders]').prop('checked');

        $.ajax({
            url: '/signup.php',
            method: 'POST',
            data: {
                full_name: full_name,
                phone: clean_phone,
                reminders: reminders,
                'class': clazz,
                dataType: 'html',
                method: 'POST',
            }
        }).done(function() {
            $form.hide();
            var text = 'Thanks for signing up '+ full_name + '. We\'ll see you in class at Albee School of Dance in Carroll Gardens. Please bring cash or a check for payment.';

            $('#signup-success').html(text);

            $('#signup-success').show();
        }).fail(function() {
            alert('We\'re having trouble signing people up. You can show up to class without signing up online. Please contact us if you have questions');
        });;

        e.preventDefault();
        return false;
    });
});
