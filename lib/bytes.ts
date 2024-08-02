export function atob(base64: string): string {
  return Buffer.from(base64, "base64").toString("binary");
}

export function btoa(binary: string): string {
  return Buffer.from(binary, "binary").toString("base64");
}
