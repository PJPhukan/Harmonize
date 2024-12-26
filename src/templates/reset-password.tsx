import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import { VarificationTemplateProps } from "@/types/varificationMailTypes";
  
  export default function ResentPasswordEmailTemplate({
    username,
    otp,
  }: VarificationTemplateProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Verification Code</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Here&apos;s your verification code: {otp}</Preview>
        <Section>
          <Row>
            <Heading as="h2">Dear {username},</Heading>
          </Row>
          <Row>
            <Text>
            We received a request to reset the password for your account associated with this email address. Please use the One-Time Password (OTP) below to proceed with the reset:
            </Text>
          </Row>
          <Row>
            <Text>
            Your OTP: <b>{otp}</b>
            </Text>
          </Row>
          <Row>
            <Text>
            This OTP is valid for 10 minutes. If you did not request a password reset, you can safely ignore this email, and your account will remain secure.
            </Text>
          </Row>
          <Row>
            <Text>
            To reset your password, follow these steps:
            </Text>
          </Row>
          <Row>
            <Text>
            1.Enter the OTP on the password reset page.
            </Text>
          </Row>
          <Row>
            <Text>
            2.Create a new password for your account.
            </Text>
          </Row>
          <Row>
            <Text>
            For any assistance, please contact our support team at [support@example.com].
            </Text>
          </Row>
          <Row>
            <Text>
            Best regards,
            </Text>
          </Row>
          <Row>
            <Text>
            Match-Up
            </Text>
          </Row>
        </Section>
      </Html>
    );
  }
  