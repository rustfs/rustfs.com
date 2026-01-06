'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useRef, useState } from 'react'

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Austria',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Portugal',
  'Ireland',
  'Japan',
  'South Korea',
  'Singapore',
  'Hong Kong',
  'China',
  'India',
  'Brazil',
  'Mexico',
  'Argentina',
  'Chile',
  'South Africa',
  'United Arab Emirates',
  'Saudi Arabia',
  'Israel',
  'Turkey',
  'Russia',
  'Other'
]

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    company: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleHCaptchaVerify = (token: string) => {
    setHCaptchaToken(token)
  }

  const handleHCaptchaExpire = () => {
    setHCaptchaToken(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!hCaptchaToken) {
      setSubmitStatus('error')
      alert('Please complete the captcha verification')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '6646b46d-5e9e-4cf4-99fd-701b15c8bf6e',
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone || undefined,
          country: formData.country,
          company: formData.company,
          message: formData.message,
          'h-captcha-response': hCaptchaToken,
          from_name: 'RustFS Contact Form'
        })
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          company: '',
          message: ''
        })
        setHCaptchaToken(null)
        captchaRef.current?.resetCaptcha()
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id='contact'
      className="relative overflow-hidden bg-background py-32 text-white"
    >
      <div className="mx-auto flex max-w-340 flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-primary">
            Contact Us
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get in touch with our team. We&apos;d love to hear from you.
          </p>
        </div>

        <div className="mx-auto w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-foreground">
                  First Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-foreground">
                  Last Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                Business Email <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your.email@company.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                Business Phone <span className="text-muted-foreground text-sm">(Optional)</span>
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="e.g., +1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="country" className="mb-2 block text-sm font-medium text-foreground">
                  Country <span className="text-destructive">*</span>
                </label>
                <Select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full"
                >
                  <option value="">Select a country</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
                  Company <span className="text-destructive">*</span>
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  required
                  placeholder="Enter your company name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                Message <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Please tell us about your inquiry, requirements, or how we can help you. Include any specific details about your use case, expected scale, or technical requirements."
                value={formData.message}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="flex justify-center">
              <HCaptcha
                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                onVerify={handleHCaptchaVerify}
                onExpire={handleHCaptchaExpire}
                ref={captchaRef}
                reCaptchaCompat={false}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Thank you for your message! We&apos;ll get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  Something went wrong. Please try again later.
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="min-w-[200px]"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
