'use client'

import ContactUsButton from "./buttons/contact-us";

export default function HomeMultiClouds() {return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {'True Multi-Cloud Storage'}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {'Multi-cloud object storage allows enterprises to build AWS S3-compatible data infrastructure on any cloud. The result is a consistent, portable interface for data and applications - meaning you can run anywhere, from edge to public cloud, without changing a line of code.'}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <ContactUsButton />
            {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-neutral-100">
              {'Contact Us'} <span aria-hidden="true">→</span>
            </a> */}
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-foreground">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-brand">
                  <svg className="h-6 w-6 text-brand-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                {'Public Cloud'}
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p className="flex-auto">
                  {'RustFS is powered by Kubernetes and provides scalable, secure, S3-compatible object storage for every public cloud. Free yourself from vendor lock-in and treat clouds for what they are - commodity compute, network, and drives.'}
                </p>

              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-foreground">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-brand">
                  <svg className="h-6 w-6 text-brand-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                {'Private Cloud'}
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p className="flex-auto">
                  {'From OpenShift to Tanzu, RustFS is the only object storage that is part of the infrastructure foundation of leading Kubernetes distributions. With its massive portfolio of integrated applications, RustFS completes the software-defined picture.'}
                </p>

              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-foreground">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-brand">
                  <svg className="h-6 w-6 text-brand-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                </div>
                {'Edge'}
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p className="flex-auto">
                  {'The complete RustFS multi-cloud storage binary is less than 100MB, capable of powering object storage anywhere - from ARM SOCs, 5G POPs, and edge cache devices to mini data centers. This is why RustFS dominates the edge storage market.'}
                </p>

              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
