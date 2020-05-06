export interface NewInvoice {
  name: String;
}

export interface Invoice extends NewInvoice {
  invoiceId: string;
}

const getUserId = async () => {
  // arbitrarily takes first user
  const resU = await fetch("/api/users");
  const users = await resU.json();
  const userId = users[0].userId;
  return userId;
};

export const remove = async (id: string) => {
  const userId = await getUserId();
  await fetch(`/api/invoices/${id}`, {
    method: "delete",
    headers: { userId },
  });
};

export const list = async (): Promise<Invoice[]> => {
  const userId = await getUserId();
  const res = await fetch(`/api/invoices`, { headers: { userId } });
  const json = await res.json();
  return json.map((raw: any) => raw);
};

export const create = async (invoice: NewInvoice) => {
  const userId = await getUserId();
  await fetch(`/api/invoices`, {
    method: "post",
    body: JSON.stringify(invoice),
    headers: { "Content-Type": "application/json", userId },
  });
};
