'use server'

export interface ContactState {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'email' | 'service' | 'budget' | 'message', string>>
}

const SERVICES = ['AI Video Ads', 'Workflow Automation', 'AI Agents & Chatbots', 'Not sure yet']
const BUDGETS = ['< $2k', '$2k – $5k', '$5k – $15k', '$15k+']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const service = String(formData.get('service') ?? '')
  const budget = String(formData.get('budget') ?? '')
  const message = String(formData.get('message') ?? '').trim()

  const errors: ContactState['errors'] = {}
  if (name.length < 2 || name.length > 100) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = 'Please enter a valid email.'
  if (!SERVICES.includes(service)) errors.service = 'Select a service.'
  if (!BUDGETS.includes(budget)) errors.budget = 'Select a budget range.'
  if (message.length < 10 || message.length > 2000)
    errors.message = 'Tell us a little more (10+ characters).'

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, message: 'Please fix the highlighted fields.' }
  }

  // Hook up email delivery or a CRM here (e.g. Resend, HubSpot) to receive leads.
  return {
    status: 'success',
    message: `Thanks ${name.split(' ')[0]}! We'll reply to ${email} within one business day.`,
  }
}
