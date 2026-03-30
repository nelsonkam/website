import Image from "next/image";

export default function Home() {
  return (
    <div className="post">
      <Image
        src="/me.jpg"
        alt="Me"
        width={168}
        height={192}
        style={{ objectFit: "cover", borderRadius: "0.75rem" }}
        priority
      />
      <h1 className="post-title">About</h1>
      <div className="post-content">
        <p>
          Hey there! I&apos;m Nelson, and I love computers. I&apos;m currently
          asking &ldquo;what if?&rdquo; and exploring the frontier of
          blockchains at <a href="https://transfa.com/">Transfa</a> (a vehicle for my research work).
        </p>
        <p>
          In the past, I worked a lot in the fintech space in Africa. With a
          couple of friends, I built and launched{" "}
          <a href="https://www.linkedin.com/company/72695570/">Kash</a>, a
          credit card issuing service for African consumers (think Revolut or
          Cash app, but for Africa). We grew Kash to about 20,000 users and
          processed about $500K in payments. After that, I joined{" "}
          <a href="https://chippercash.com/">Chipper Cash</a> as a senior
          software engineer and worked on their money movement and crypto
          infrastructure. I also worked as a tech lead at{" "}
          <a href="https://www.djamo.com/">Djamo</a>, the first neobank based
          in West Africa backed by YC. In my last role, I was Lead Developer on 
          the API team at <a href="https://www.conduitpay.com/">Conduit</a>.
        </p>
        <p>
          My interests lay at the intersection of systems programming, fintech 
          and cryptography with a focus on blockchain technology.
        </p>
        <p>
          Want to chat? You can email me at{" "}
          <strong>hello [at] [this domain name].</strong>
        </p>
        <p>
          You can also find me on{" "}
          <a href="https://x.com/nelsonkamga">X (fka Twitter)</a>,{" "}
          <a href="https://linkedin.com/in/nelson-kamga">LinkedIn</a> and{" "}
          <a href="https://github.com/nelsonkamga">GitHub</a>
        </p>
      </div>
    </div>
  );
}
