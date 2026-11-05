import Link from "next/link";
import { site } from "@/lib/site";

// خط مورب، نوشته Contact us و آیکن تلفن روی نوک خط: ثابت پایین-راست همه صفحه‌ها
export default function ContactFloat() {
  return (
    <div className="contact-float">
      <div className="contact-float-line">
        <span className="contact-float-stroke" aria-hidden="true" />

        <a
          href={`tel:${site.phone}`}
          aria-label="Call us"
          className="contact-float-phone"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      </div>

      <Link href="/contact" className="contact-float-label">
        Contact us
      </Link>
    </div>
  );
}