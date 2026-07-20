import { ThemeTokenShowcase } from "@/components/oria/theme-token-showcase";

export function ThemeTokenContract() {
  return (
    <section id="token-contract" className="token-gallery preview-token-gallery">
      <header className="token-heading">
        <div>
          <p className="section-kicker">Token contract</p>
          <h2>See the system behind the surface.</h2>
        </div>
        <p>The semantic tokens below respond to the active OriaTheme and the editor&apos;s live preview.</p>
      </header>
      <ThemeTokenShowcase />
    </section>
  );
}
