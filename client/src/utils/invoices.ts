export interface NewInvoice {
  name: String;
}

export interface Invoice extends NewInvoice {
  id: string;
}

export const remove = async (id: string) => {
  await fetch(`/api/invoices/${id}`, { method: "delete" });
};

export const list = async (): Promise<Invoice[]> => {
  const res = await fetch("/api/invoices");
  const json = await res.json();
  return json.map((raw: any) => {
    raw.id = raw._id;
    delete raw._id;
    delete raw.__v;
    return raw;
  });
};

export const create = async (invoice: NewInvoice) => {
  await fetch("/api/invoices", {
    method: "post",
    body: JSON.stringify(invoice),
    headers: { "Content-Type": "application/json" },
  });
};
