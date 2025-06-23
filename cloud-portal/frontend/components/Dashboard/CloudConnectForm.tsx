import React, { useState, ChangeEvent, FormEvent } from "react";
import { Card, Typography, Button, message } from "antd";
import { z } from "zod";
import { User as FirebaseUser } from "firebase/auth";

const { Title } = Typography;

interface Props {
  user: FirebaseUser | null;
}

const schemas = {
  aws: z.object({
    accessKey: z.string().min(1, "Access Key is required"),
    secretKey: z.string().min(1, "Secret Key is required"),
  }),
  gcp: z.object({
    type: z.literal("service_account"),
    project_id: z.string().min(1),
    private_key_id: z.string().min(1),
    private_key: z.string().min(1),
    client_email: z.string().email(),
    client_id: z.string().min(1),
    auth_uri: z.string().url(),
    token_uri: z.string().url(),
    auth_provider_x509_cert_url: z.string().url(),
    client_x509_cert_url: z.string().url(),
  }),
  azure: z.object({
    tenantId: z.string().min(1),
    clientId: z.string().min(1),
    clientSecret: z.string().min(1),
  }),
};

const CloudConnectForm: React.FC<Props> = ({ user }) => {
  const [provider, setProvider] = useState<"aws" | "gcp" | "azure">("aws");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      file.text().then((text) => {
        try {
          const json = JSON.parse(text);
          setFormData(json);
        } catch {
          message.error("Invalid JSON file");
        }
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    const schema = schemas[provider];
    const result = schema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.errors.map((err) => err.message).join(", ");
      setSubmitError(`Validation failed: ${errors}`);
      setIsSubmitting(false);
      return;
    }

    try {
      const token = user ? await user.getIdToken() : null;
      const res = await fetch("http://localhost:4000/api/connect-cloud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ provider, credentials: result.data }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");

      setSubmitMessage(data.message || `Connected to ${provider}`);
    } catch (error: any) {
      console.error("Connection failed:", error);
      setSubmitError(error.message || "Failed to connect.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const logoMap: { [key in "aws" | "gcp" | "azure"]: string } = {
    aws: "/aws-icon.png",
    gcp: "/gcp-icon.png",
    azure: "/azure-icon.png",
  };

  const showClearButton =
    provider !== "gcp" &&
    Object.values(formData).some((val) => val && val.trim && val.trim() !== "");

  const clearInputs = () => {
    setFormData({});
    setSubmitError("");
    setSubmitMessage("");
  };

  return (
    <section
      className="mt-8 mb-[0.5cm]"
      style={{ fontFamily: "Times New Roman, Times, serif" }}
    >
      <Card
        style={{
          height: "260px",
          backgroundColor: "#1e293b",
          color: "#ffffff",
          overflow: "hidden",
          borderRadius: "16px",
          border: "none",
          fontFamily: "Times New Roman, Times, serif",
          position: "relative",
        }}
      >
        {/* Clear Button */}
        {showClearButton && (
          <Button
            size="small"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              zIndex: 10,
              backgroundColor: "#334155",
              color: "#fff",
              fontSize: "12px",
              fontFamily: "Times New Roman, Times, serif",
              border: "1px solid #475569",
            }}
            onClick={clearInputs}
          >
            Clear
          </Button>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
            fontFamily: "Times New Roman, Times, serif",
          }}
        >
          <img
            src={logoMap[provider]}
            alt={`${provider} logo`}
            style={{ height: "40px", marginRight: "10px" }}
          />
          <Title level={4} style={{ color: "#ffffff", margin: 0, fontFamily: "Times New Roman, Times, serif" }}>
            Cloud Connect - {provider.toUpperCase()}
          </Title>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center"
          style={{ fontFamily: "Times New Roman, Times, serif" }}
        >
          <select
            onChange={(e) => {
              setProvider(e.target.value as "aws" | "gcp" | "azure");
              setFormData({});
              setSubmitError("");
              setSubmitMessage("");
            }}
            value={provider}
            className="border px-3 py-3 w-96 mb-[0.2cm]"
            style={{ color: "#333", fontFamily: "Times New Roman, Times, serif" }}
          >
            <option value="aws">AWS</option>
            <option value="gcp">GCP</option>
            <option value="azure">Azure</option>
          </select>

          {provider === "aws" && (
            <>
              <input
                placeholder="Access Key"
                onChange={(e) =>
                  setFormData({ ...formData, accessKey: e.target.value })
                }
                value={formData.accessKey || ""}
                className="border px-3 py-3 w-96 mb-[0.2cm]"
                required
                style={{ color: "#333", fontFamily: "Times New Roman, Times, serif" }}
              />
              <input
                placeholder="Secret Key"
                onChange={(e) =>
                  setFormData({ ...formData, secretKey: e.target.value })
                }
                value={formData.secretKey || ""}
                className="border px-3 py-3 w-96 mb-[0.6cm]"
                required
                style={{ color: "#333", fontFamily: "Times New Roman, Times, serif" }}
              />
            </>
          )}

          {provider === "gcp" && (
            <input
              type="file"
              accept="application/json"
              onChange={handleFileChange}
              className="w-96 mb-[0.6cm]"
              required
              style={{ fontFamily: "Times New Roman, Times, serif" }}
            />
          )}

          {provider === "azure" && (
            <>
              <input
                placeholder="Tenant ID"
                onChange={(e) =>
                  setFormData({ ...formData, tenantId: e.target.value })
                }
                value={formData.tenantId || ""}
                className="border px-3 py-3 w-96 mb-[0.2cm]"
                required
                style={{ color: "#333", fontFamily: "Times New Roman, Times, serif" }}
              />
              <input
                placeholder="Client ID"
                onChange={(e) =>
                  setFormData({ ...formData, clientId: e.target.value })
                }
                value={formData.clientId || ""}
                className="border px-3 py-3 w-96 mb-[0.2cm]"
                required
                style={{ color: "#333", fontFamily: "Times New Roman, Times, serif" }}
              />
              <input
                placeholder="Client Secret"
                onChange={(e) =>
                  setFormData({ ...formData, clientSecret: e.target.value })
                }
                value={formData.clientSecret || ""}
                className="border px-3 py-3 w-96 mb-[0.4cm]"
                required
                style={{ color: "#333", fontFamily: "Times New Roman, Times, serif" }}
              />
            </>
          )}

          <div className="w-96 flex justify-end">
            <Button
              htmlType="submit"
              type="primary"
              loading={isSubmitting}
              style={{ fontFamily: "Times New Roman, Times, serif" }}
            >
              Connect to {provider.toUpperCase()}
            </Button>
          </div>

          {submitMessage && (
            <p
              style={{
                color: "green",
                marginTop: "0.2cm",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              {submitMessage}
            </p>
          )}
          {submitError && (
            <p
              style={{
                color: "red",
                marginTop: "0.2cm",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              {submitError}
            </p>
          )}
        </form>
      </Card>
    </section>
  );
};

export default CloudConnectForm;
