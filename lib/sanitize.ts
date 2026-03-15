import validator from 'validator'

export function sanitizeInput(input: string): string {
  return validator.escape(validator.trim(input))
}

export function validateEmail(email: string): boolean {
  return validator.isEmail(email)
}

export function validatePhone(phone: string): boolean {
  // Indian phone number validation
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{4,10}$/
  return phoneRegex.test(phone)
}

export function sanitizeLead(data: any) {
  return {
    name: sanitizeInput(data.name),
    company: sanitizeInput(data.company),
    email: validator.normalizeEmail(data.email) || data.email,
    phone: sanitizeInput(data.phone),
    budget: sanitizeInput(data.budget),
    services: Array.isArray(data.services) 
      ? data.services.map((s: string) => sanitizeInput(s))
      : [],
    message: sanitizeInput(data.message),
  }
}
