import { useEffect, useState } from "react";

interface ContactInfo {
  support: string;
  dispute: string;
}

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3003/api/contact-info")
      .then((res) => res.json())
      .then((data) => setContactInfo(data))
      .catch((err) => console.error("Failed to fetch contact info:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return { contactInfo, isLoading };
}
