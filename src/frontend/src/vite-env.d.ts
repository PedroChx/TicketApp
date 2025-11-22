/// <reference types="vite/client" />

declare module "qrcode.react" {
    import * as React from "react";

    export interface QRCodeProps {
        value: string;
        size?: number;
        level?: "L" | "M" | "Q" | "H";
        includeMargin?: boolean;
    }

    export class QRCodeCanvas extends React.Component<QRCodeProps> { }
    export class QRCodeSVG extends React.Component<QRCodeProps> { }
}
