import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand"><Logo size={36} light /></Link>
            <p>Homemade food, made with love, just for you. Discover home chefs, halal &amp; vegan kitchens, bakers, tiffins, and more near you.</p>
            <div className="socials">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">◎</a>
              <a href="#" aria-label="Twitter">✕</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/about#how">How It Works</Link></li>
              <li><Link href="/become-a-cook">Become a Vendor</Link></li>
              <li><Link href="/contact">Become a Rider</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Halal Responsibility</a></li>
              <li><a href="#">Food Safety</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>More</h4>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/meal-plans">Meal Plans</Link></li>
              <li><Link href="/kitchen">Kitchen Login</Link></li>
              <li><Link href="/driver">Driver Login</Link></li>
              <li><Link href="/admin">Admin</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Kitchi Kitchi. All rights reserved.</span>
          <span>Made with ❤️ in Houston, TX</span>
        </div>
      </div>
    </footer>
  );
}
