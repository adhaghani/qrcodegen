import React, { useEffect, useState } from "react";

import { QRCodeSVG } from "qrcode.react";

import html2canvas from "html2canvas";
import HeroElement from "./assets/HeroElement";

import "./Style.css";

function App() {
  const [Url, setUrl] = useState("");
  const [DataUrl, setDataUrl] = useState("");

  const generateQRCode = (e) => {
    e.preventDefault();
    setDataUrl(Url);
  };

  const downloadQRCode = async () => {
    const qrCodeElement = printContentRef.current;
    if (qrCodeElement) {
      const canvas = await html2canvas(qrCodeElement);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "qrcode.png";
      link.click();
    } else {
      console.error("Unable to find QR code element");
    }
  };

  const printContentRef = React.createRef();

  const clearData = (e) => {
    setDataUrl("");
    setUrl("");
  };

  useEffect(() => {
    if (DataUrl) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [DataUrl]);

  return (
    <div className="App">
      <h2 className="Title">QR Code Generator</h2>
      <div className="Container">
        <div className="Column__Section">
          <form onSubmit={generateQRCode}>
            <h2 className="Form__Title">QR Code Generator</h2>
            <p>
              A simple QR Code Generator that did what it needs to do, with no
              profit intention. This projects aim to provide a service that is
              direct, easy and convenient to people who need qr code.
            </p>
            <p>no ads, no payment, 100% free.</p>
            <div className="Input__Section">
              <label htmlFor="url">Enter Url</label>
              <input
                type="url"
                value={Url}
                onChange={(e) => setUrl(e.target.value)}
                required
                placeholder="Https://example.com"
              />
            </div>
            <div className="Input__Section">
              <input className="Btn" type="submit" value="Generate QR Code" />
            </div>
            <p>
              while you're here,{" "}
              <a
                className="Link"
                target="_BLANK"
                href="https://www.adhaghani.com"
              >
                visit my website.
              </a>
            </p>
          </form>
        </div>
        {DataUrl && (
          <div className="Section QRCode" onClick={clearData}>
            <div className="ContainerQR">
              <div ref={printContentRef} className="SVG__Container">
                <QRCodeSVG
                  id="svg"
                  value={DataUrl}
                  width={250}
                  level="H"
                  height={250}
                />
              </div>
              <button onClick={downloadQRCode} className="Btn">
                Download QR code
              </button>
            </div>
          </div>
        )}
        <div className="Column__Section Elements">
          <HeroElement />
        </div>
      </div>
    </div>
  );
}

export default App;
