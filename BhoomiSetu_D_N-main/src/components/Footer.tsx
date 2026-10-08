import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { label: 'Home', path: '/' },
      { label: 'Research Hub', path: '/research' },
      { label: 'Data & Evidence', path: '/data' },
      { label: 'Land Insights', path: '/land-insights' },
    ],
  },
  {
    title: 'Innovation',
    links: [
      { label: 'Policy Innovation', path: '/policy' },
      { label: 'Case Studies', path: '/case-studies' },
      { label: 'Knowledge Centre', path: '/knowledge' },
      { label: 'About', path: '/about' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-cream-200">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-600 text-cream-50">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-cream-50">BhoomiSetu</span>
                <p className="text-xs text-cream-300 uppercase tracking-wider">भूमि सेतु</p>
              </div>
            </div>
            <p className="text-sm text-cream-300 max-w-md leading-relaxed">
              A national digital platform connecting research, data, and evidence to
              support better land governance and rural development policy in India.
            </p>
            <div className="mt-4 space-y-2 text-sm text-cream-300">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-saffron-400" /> contact@bhoomisetu.gov.in
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-saffron-400" /> +91 11 2345 6789
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-saffron-400" /> New Delhi, India
              </p>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-cream-50 mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-cream-300 hover:text-saffron-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-navy-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-400">
            © 2026 BhoomiSetu · Ministry of Rural Development, Government of India
          </p>
          <p className="text-xs text-cream-400">
            Prototype / Demonstration — Not an official government policy
          </p>
        </div>
      </div>
    </footer>
  );
}
