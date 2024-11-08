import { computed, ref, watchEffect } from "vue";


export const usePassword = () => {

  const validatePasswordContains = (password:string, regex: RegExp) => {
    for (let i = 0; i < password.length; i++) {
      let ch = password.charAt(i);

      if (regex.test(ch)) return true;
    }
    return false;
  };

  const hasMinLength = (password:string, minLength: number) => {
    return password.length >= minLength
  }

  const passwordClasses = (value: boolean) => {
    return {
      'text-green-500': value,
      'text-red-400': !value,
    };
  }

  const hasUppercase = (password: string) => {
    return validatePasswordContains(password, /[A-Z]/);
  }
  const hasLowercase = (password: string) => {
    return validatePasswordContains(password, /[a-z]/);
  }
  const hasNumber = (password: string) => {
    return validatePasswordContains(password, /[0-9]/);
  }
  const hasSpecialChar = (password: string) => {
    return validatePasswordContains(password, /[@#$_]/);
  }

  return {
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
    hasMinLength,
    passwordClasses
  }
}