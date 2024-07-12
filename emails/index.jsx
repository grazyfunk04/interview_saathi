import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = "";

export const Email = ({
  userFirstName,
  assessmentTopic,
  assessmentQuestions,
  assessmentLevel,
  date,
  correctAns,
  totalAns,
}) => {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Your Assessment Result</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img src={""} />
          </Section>

          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                src={
                  "https://sites.rmit.edu.au/dsclt/files/2021/09/Questionnaire.png"
                }
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi {userFirstName},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Thank You for taking assessment on Interview Saathi
                </Heading>
                <Text>Please find the assessment details:</Text>
                <Text style={paragraph}>
                  <b>Assessment Topic: </b>
                  {assessmentTopic}
                </Text>
                <Text style={paragraph}>
                  <b>Assessment Questions: </b>
                  {assessmentQuestions}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Assessment Level: </b>
                  {assessmentLevel}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Attempted on: </b>
                  {date}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5, color: "green" }}>
                  <b>Your Correct Ans: </b>
                  {correctAns}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Total Questions Attempted: </b>
                  {totalAns}
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img style={image} width={620} src={""} />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            Copyright © {year} | All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

Email.PreviewProps = {
  userFirstName: "",
  assessmentTopic: "",
  assessmentQuestions: "",
  assessmentLevel: "",
  date: "",
  correctAns: "",
  totalAns: "",
};

export default Email;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#cc66ff",
  borderRadius: 6,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
