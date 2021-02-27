import re
from django.core.exceptions import ValidationError

def validate_name(value):
    pattern = r'[a-zA-Z ]+'

    if len(str(value))<2:
        raise ValidationError('Minimum two characters will be allowed')
    elif re.fullmatch(pattern,str(value)):
        return value
    else:
        raise ValidationError('Please enter the valid name')


def validate_mobile(value):
    pattern = r'[0-9]{10}'
    if re.fullmatch(pattern,str(value)):
        return value
    else:
        raise ValidationError('Please enter the valid mobile number')


def validate_password(value):
    if (len(value)<5): 
        raise ValidationError('Length of the password must be greater than 5')
    elif not re.search("[a-z]", value): 
        raise ValidationError('Password must contain at least one lowercase alphabetic value')
    elif not re.search("[A-Z]", value): 
        raise ValidationError('Password must contain at least one uppercase alphabetic value')
    elif not re.search("[0-9]", value): 
        raise ValidationError('Password must contain at least one numeric value')
    elif not re.search("[!#%&_@$]", value): 
        raise ValidationError('Password must contain one special character from [!#%&_@$]')
    elif re.search("\s", value): 
        raise ValidationError('Password should not contain any space')
    else: 
        return value
