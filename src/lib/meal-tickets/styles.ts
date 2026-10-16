/** CSS талона — из эталона talony-pitanie-5v.html */
export const MEAL_TICKET_STYLES = `
    @page {
      size: A4 landscape;
      margin: 0;
    }

    * { box-sizing: border-box; }

    html, body {
      margin: 0;
      padding: 0;
      background: #d8dde3;
      color: #000;
      font-family: "Times New Roman", Times, "Liberation Serif", serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .screen-hint {
      max-width: 297mm;
      margin: 12px auto;
      padding: 10px 14px;
      background: #fff;
      border: 1px solid #b8c0c8;
      border-radius: 6px;
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 13px;
      line-height: 1.45;
      color: #24303a;
    }

    .screen-hint strong { color: #0b3d91; }

    .page {
      width: 276mm;
      height: 180mm;
      margin: 12px auto;
      padding: 0;
      background: #fff;
      box-shadow: 0 4px 18px rgba(0, 0, 0, .18);
      display: grid;
      grid-template-columns: repeat(6, 46mm);
      grid-template-rows: repeat(3, 60mm);
      justify-content: center;
      align-content: center;
      gap: 0;
      page-break-after: always;
      break-after: page;
    }

    .page:last-child {
      page-break-after: auto;
      break-after: auto;
    }

    .card {
      width: 46mm;
      height: 60mm;
      border: 0.3mm solid #000;
      display: grid;
      grid-template-columns: 1fr 7.6mm;
      overflow: hidden;
      background: #fff;
    }

    .main {
      padding: 1.2mm 1.2mm 4mm 1.3mm;
      display: flex;
      flex-direction: column;
      min-width: 0;
      height: 100%;
    }

    .school {
      text-align: center;
      font-size: 7.6pt;
      font-weight: 700;
      line-height: 1.08;
    }

    .title {
      text-align: center;
      font-weight: 700;
      font-size: 9.2pt;
      line-height: 1.04;
      margin: 1.6mm 0 0;
      text-transform: uppercase;
    }

    .fields {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1 1 auto;
      min-height: 0;
      padding-top: 2.6mm;
    }

    .field {
      font-size: 7.4pt;
      font-weight: 700;
      line-height: 1.05;
      margin: 0;
    }

    .class-row {
      display: flex;
      align-items: flex-end;
      gap: 0.8mm;
      width: 100%;
    }

    .class-row .label {
      white-space: nowrap;
      font-weight: 700;
      padding-bottom: 0.05mm;
    }

    .class-row .underline {
      flex: 0 0 12mm;
      width: 12mm;
      min-height: 3mm;
    }

    .underline {
      position: relative;
      border-bottom: 0.28mm solid #000;
      min-height: 2.8mm;
    }

    .name-block,
    .sig-block {
      width: 100%;
    }

    .name-block .name-label {
      font-weight: 700;
      line-height: 1;
      margin: 0;
    }

    .name-block .name-line {
      margin-top: 2.2mm;
      min-height: 3mm;
    }

    .date-row {
      font-size: 7pt;
      font-weight: 700;
      white-space: nowrap;
      line-height: 1.1;
      width: 100%;
    }

    .sig-block .sig-label {
      font-weight: 700;
      line-height: 1;
      margin: 0;
    }

    .sig-block .sig-line {
      margin-top: 1.8mm;
      min-height: 2.5mm;
    }

    .hand {
      font-family: "Caveat", cursive !important;
      font-weight: 600 !important;
      font-size: 11.5pt !important;
      color: #1a4499 !important;
      -webkit-text-stroke: 0.28px #1a4499;
      paint-order: stroke fill;
      letter-spacing: 0.01em;
      line-height: 1;
    }

    .fill-class {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -0.1mm;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fill-name {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -0.25mm;
      padding: 0 0.15mm;
      white-space: nowrap;
      letter-spacing: 0 !important;
      word-spacing: 0.06em;
    }

    .fill-day {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .fill-month {
      display: inline-block;
      padding: 0 0.1mm;
    }

    .date-blank {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 5.5mm;
      height: 3.2mm;
      border-bottom: 0.28mm solid #000;
      vertical-align: baseline;
      padding: 0 0.25mm;
    }

    .date-month-blank {
      display: inline-flex;
      align-items: flex-end;
      justify-content: center;
      min-width: 13mm;
      height: 3.2mm;
      border-bottom: 0.28mm solid #000;
      vertical-align: baseline;
      padding: 0 0.1mm;
    }

    .meal-col {
      border-left: 0.3mm solid #000;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 1mm 0.55mm 1mm 0.45mm;
      overflow: hidden;
    }

    .meal {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      white-space: nowrap;
      font-weight: 700;
      font-size: 10pt;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      line-height: 1;
      margin: 0;
    }

    .meal.obed {
      font-size: 12pt;
      letter-spacing: 0.18em;
    }

    @media print {
      html, body {
        background: #fff;
        margin: 0;
        padding: 0;
        width: 297mm;
        height: 210mm;
      }
      .screen-hint { display: none !important; }
      .page {
        width: 297mm;
        height: 210mm;
        margin: 0;
        box-shadow: none;
        display: grid;
        grid-template-columns: repeat(6, 46mm);
        grid-template-rows: repeat(3, 60mm);
        justify-content: center;
        align-content: center;
        page-break-after: always;
        break-after: page;
      }
      .page:last-child {
        page-break-after: auto;
        break-after: auto;
      }
    }
`
