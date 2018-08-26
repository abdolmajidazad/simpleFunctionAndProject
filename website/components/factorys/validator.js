myApp.factory('validator', ['settings','$filter', function (settings, $filter) {
    let regexText = settings.regexText;
    let regexEmail = settings.regexEmail;
    let regexRemoveExtraCharacter = settings.regexRemoveExtraCharacter;
    let regexWebsite = settings.regexWebsite;
    let regexPassword = settings.regexPassword;
    const validator = {
        validateText: (text, type) => {
            if (text) {
                if (regexText.test(text)) {
                    return 'wrong_phrase';
                } else {
                    return 'valid';
                }
            } else if (type === 'require' && !text) {
                return 'is_required';
            } else {
                return 'valid';
            }
        },
        validateEmail: (text, type) => {
            if (text) {
                if (!regexEmail.test(text)) {
                    return 'wrong_email';
                } else {
                    return 'valid';
                }
            } else if (type === 'require' && !text) {
                return 'is_required';
            } else {
                return 'valid';
            }

        },
        validateWebsite: (text, type) => {
            if (text) {
                if (!regexWebsite.test(text)) {
                    return 'wrong_website';
                } else {
                    return 'valid';
                }
            } else if (type === 'require' && !text) {
                return 'is_required';
            } else {
                return 'valid';
            }

        },
        validateLength: (text, type, length) => {
            if (text && text.length !== length) {
                return 'wrong_phrase';
            } else if (type === 'require' && !text) {
                return 'is_required';
            } else {
                return 'valid';
            }
        },
        validateExist: (text, type) => {
            text = text ? text.toString() : '';
            if (text) {
                return 'valid';
            } else {
                if (type === 'require') {
                    return 'is_required';
                } else {
                    return 'valid';
                }
            }
        },
        validateNumber: (number, type, min, max, equal) => {
            number = number ? number : 0;
            if(typeof(equal) === 'number' && number===equal){
                return 'valid';
            }else if (typeof(number) !== 'number' && type) {
                return 'is_required';
            } else if (typeof(min) === 'number' && number < min) {
                return $filter('translate')('must_greeter_than') + ' ' + min +' ' +$filter('translate')('be');
            } else if (typeof(max) === 'number' && number > max) {
                return $filter('translate')('must_less_than') + ' ' + max+' ' +$filter('translate')('be');
            } else {
                return 'valid';
            }
        },
        validatePassword: (password) => {
            if (password) {
                if (!regexPassword.test(password)) {
                    return 'wrong_password';
                } else {
                    return 'valid';
                }
            } else {
                return 'is_required';
            }
        },
        validateConfirmPassword: (password, confirmPassword) => {
            if (confirmPassword) {
                if (confirmPassword === password) {
                    return 'valid';
                } else {
                    return 'wrong_confirm_password';
                }
            } else {
                return 'is_required';
            }
        },
        validateIBANNumber: (text, type) => {
            /*
            * Returns 1 if the IBAN is valid
            * Returns FALSE if the IBAN's length is not as should be (for CY the IBAN Should be 28 chars long starting with CY )
            * Returns any other number (checksum) when the IBAN is invalid (check digits do not match)
            */

            if (type === 'require' && !text) {
                return 'is_required';
            }
            text = text.replace(/\s/g, '');
            // https://jsfiddle.net/kf332bhj/1/
            // http://hesabdaresabz.com/acc/acceducation/109-%D8%A7%D9%84%DA%AF%D9%88%D8%B1%DB%8C%D8%AA%D9%85-%D8%A7%D8%B9%D8%AA%D8%A8%D8%A7%D8%B1%D8%B3%D9%86%D8%AC%DB%8C-%DA%A9%D8%AF-%D8%B4%D8%A8%D8%A7%DB%8C-%D8%A8%D8%A7%D9%86%DA%A9%DB%8C.html
            let CODE_LENGTHS = {
                AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
                CH: 21, CR: 21, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, ES: 24,
                FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21,
                HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
                LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27,
                MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
                RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26,
                IR: 26, AL: 28, DZ: 24, AO: 25, BJ: 28, BF: 27, BI: 16, CM: 27, CV: 25,
                GE: 22, CI: 28, MG: 27, ML: 28, MZ: 25, SN: 28, VG: 24
            };
            let iban = String(text).toUpperCase().replace(/[^A-Z0-9]/g, ''), // keep only alphanumeric characters
                code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/), // match and capture (1) the country code, (2) the check digits, and (3) the rest
                digits;
            // check syntax and length
            if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
                return 'invalid_length_iban';
            }
            // rearrange country code and check digits, and convert chars to ints
            digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
                return letter.charCodeAt(0) - 55;
            });
            // final check
            if (mod97(digits) === 1) {
                return 'valid'
            } else {
                return 'wrong_iban';
            }
        },
        validateNationalId: (nationalId, type) => {
            if (type === 'require' && !nationalId) {
                return 'is_required';
            }
            nationalId = nationalId.replace(regexRemoveExtraCharacter, '');
            if (nationalId) {
                if (nationalId.length < 10 || nationalId.length > 10) {
                    return 'invalid_national_id';
                } else {
                    if (nationalId === '1111111111' || nationalId === '2222222222' || nationalId === '3333333333' || nationalId === '4444444444' || nationalId === '5555555555' || nationalId === '6666666666' || nationalId === '7777777777' || nationalId === '8888888888' || nationalId === '9999999999') {
                        return 'valid';
                    } else {
                        c = parseInt(nationalId.charAt(9));
                        n = parseInt(nationalId.charAt(0)) * 10 + parseInt(nationalId.charAt(1)) * 9 + parseInt(nationalId.charAt(2)) * 8 + parseInt(nationalId.charAt(3)) * 7 + parseInt(nationalId.charAt(4)) * 6 + parseInt(nationalId.charAt(5)) * 5 + parseInt(nationalId.charAt(6)) * 4 + parseInt(nationalId.charAt(7)) * 3 + parseInt(nationalId.charAt(8)) * 2;
                        r = n - parseInt(n / 11) * 11;
                        if ((r === 0 && r === c) || (r === 1 && c === 1) || (r > 1 && c === 11 - r)) {
                            return 'valid';
                        }
                        else {
                            return 'invalid_national_id';
                        }
                    }
                }
            } else {
                if (type === 'require') {
                    return 'is_required';
                } else {
                    return 'valid';
                }
            }
        }

    };

    function mod97(string) {
        let checksum = string.slice(0, 2), fragment;
        for (let offset = 2; offset < string.length; offset += 7) {
            fragment = String(checksum) + string.substring(offset, offset + 7);
            checksum = parseInt(fragment, 10) % 97;
        }
        return checksum;
    }

    return validator;


}]);