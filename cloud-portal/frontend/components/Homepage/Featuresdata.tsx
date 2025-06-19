import {
  FaClipboardList,
  FaMobileAlt,
  FaProjectDiagram,
  FaUsers,
  FaDollarSign,
  FaChartLine,
} from "react-icons/fa";

export const features = {
  products: {
    title: "Products",
    description:
      "Deploy and manage cloud products with ease. Our platform supports automated version control, integration pipelines, and real-time analytics to keep your products running flawlessly.",
    icon: (
      <FaClipboardList
        style={{ color: "#22d3ee", fontSize: "2.5rem", marginBottom: "1rem" }}
      />
    ),
    color: "#22d3ee",
    details: `MultiCloudHub's Products module offers a comprehensive suite for deploying and managing cloud products with unparalleled ease and efficiency. Leveraging automated version control, it ensures that your deployments are always consistent and reliable. Integration pipelines streamline your development workflows, allowing seamless continuous integration and delivery. Real-time analytics provide deep insights into product performance, enabling proactive optimizations and rapid issue resolution. The platform supports multi-environment configurations, rollback capabilities, and health monitoring, ensuring your cloud products remain secure, scalable, and performant. Whether you're launching new features or maintaining existing services, this module empowers your teams to deliver excellence at speed, reducing downtime and enhancing user satisfaction across all cloud environments.

Key Features:
- Automated version control and rollback
- Integration with CI/CD pipelines
- Real-time product analytics and health monitoring
- Multi-environment deployment support
- Secure and scalable infrastructure management

By centralizing product management, MultiCloudHub helps businesses accelerate innovation, improve reliability, and reduce operational complexity in multi-cloud environments.`,
  },

  resources: {
    title: "Resources",
    description:
      "Monitor and optimize your cloud resources across AWS, GCP, and Azure. Gain insights into usage, performance, and cost to maximize efficiency and reduce waste.",
    icon: (
      <FaMobileAlt
        style={{ color: "#60a5fa", fontSize: "2.5rem", marginBottom: "1rem" }}
      />
    ),
    color: "#60a5fa",
    details: `The Resources module in MultiCloudHub provides a centralized dashboard to monitor and optimize your cloud assets across AWS, GCP, and Azure. It offers detailed usage metrics, performance analytics, and cost tracking to help you maximize efficiency and minimize waste. With advanced tagging and auditing features, you can enforce compliance and governance policies effortlessly. Automated recommendations guide you in rightsizing resources, identifying idle assets, and forecasting future needs. This module integrates seamlessly with your existing cloud infrastructure, providing a unified view that simplifies management and accelerates decision-making. Empower your teams to maintain optimal resource allocation, reduce expenses, and ensure high availability with confidence.

Key Features:
- Cross-cloud resource monitoring and optimization
- Usage and performance analytics
- Cost tracking and forecasting
- Tagging, auditing, and compliance enforcement
- Automated resource recommendations`,
  },

  deploys: {
    title: "Active Deploys",
    description:
      "Track your active deployments with live status updates, logs, and alerts. Quickly identify and resolve issues to keep your cloud infrastructure stable and performant.",
    icon: (
      <FaProjectDiagram
        style={{ color: "#c084fc", fontSize: "2.5rem", marginBottom: "1rem" }}
      />
    ),
    color: "#c084fc",
    details: `MultiCloudHub's Active Deploys module offers real-time visibility into your deployment pipelines, enabling you to track progress, status, and logs with precision. Integrated with popular CI/CD tools, it automates build, test, and release processes to accelerate delivery cycles. The module provides proactive alerts and detailed audit trails to quickly identify and resolve deployment issues, minimizing downtime and ensuring stability. With support for blue-green and canary deployments, you can roll out changes safely and efficiently. This comprehensive solution empowers DevOps teams to maintain high-quality releases, improve collaboration, and enhance overall operational agility in multi-cloud environments.

Key Features:
- Real-time deployment tracking and logs
- CI/CD integration and automation
- Proactive alerts and audit trails
- Support for advanced deployment strategies
- Collaboration and release management tools`,
  },

  team: {
    title: "Team Collaboration",
    description:
      "Manage team roles, permissions, and activity logs. Collaborate securely and efficiently to accelerate your cloud projects.",
    icon: (
      <FaUsers
        style={{ color: "#d1d5db", fontSize: "2.5rem", marginBottom: "1rem" }}
      />
    ),
    color: "#d1d5db",
    details: `The Team Collaboration module in MultiCloudHub facilitates secure and efficient management of user roles, permissions, and activity logs. It supports role-based access control (RBAC) and multi-factor authentication (MFA) to safeguard your cloud assets. Audit trails provide transparency and accountability, helping you meet compliance requirements. The platform enables seamless communication and task coordination among team members, fostering productivity and alignment. With customizable workflows and notifications, your teams can collaborate effectively, reduce errors, and accelerate project delivery. This module is designed to empower organizations to maintain security while promoting agile teamwork across cloud projects.

Key Features:
- Role-based access control and MFA
- Detailed audit logs and compliance support
- Team communication and task management
- Customizable workflows and notifications
- Secure collaboration across cloud projects`,
  },

  cost: {
    title: "Cost Analysis",
    description:
      "Analyze your cloud spending with detailed reports and trends. Optimize budgets and forecast future costs with confidence.",
    icon: (
      <FaDollarSign
        style={{ color: "#facc15", fontSize: "2.5rem", marginBottom: "1rem" }}
      />
    ),
    color: "#facc15",
    details: `MultiCloudHub's Cost Analysis module delivers in-depth financial insights into your cloud spending. It aggregates data across multiple providers, offering detailed reports, trend analysis, and budget forecasting. The module identifies cost-saving opportunities through anomaly detection, resource optimization, and usage patterns. Customizable dashboards and alerts keep stakeholders informed and enable proactive budget management. By providing granular visibility and actionable recommendations, this module helps organizations control expenses, optimize investments, and align cloud costs with business objectives. Empower your finance and operations teams to make data-driven decisions and maximize cloud ROI.

Key Features:
- Multi-cloud cost aggregation and reporting
- Trend analysis and budget forecasting
- Anomaly detection and cost-saving recommendations
- Customizable dashboards and alerts
- Financial governance and chargeback support`,
  },

  monitoring: {
    title: "Monitoring",
    description:
      "Real-time monitoring of your cloud infrastructure with customizable alerts and dashboards to keep you informed 24/7.",
    icon: (
      <FaChartLine
        style={{ color: "#f472b6", fontSize: "2.5rem", marginBottom: "1rem" }}
      />
    ),
    color: "#f472b6",
    details: `The Monitoring module offers comprehensive, real-time surveillance of your cloud infrastructure. It supports customizable dashboards, metrics, and alerting rules to keep you informed of system health and performance. Integration with popular monitoring and logging tools enables centralized data collection and analysis. Proactive notifications help prevent downtime and performance degradation by alerting teams to potential issues before they impact users. This module provides deep visibility into application and infrastructure layers, empowering your teams to maintain reliability, optimize performance, and ensure seamless user experiences across multi-cloud environments.

Key Features:
- Real-time metrics and customizable dashboards
- Integration with monitoring and logging tools
- Proactive alerting and incident management
- Application and infrastructure performance insights
- Historical data analysis and reporting`,
  },
};

export type FeatureKey = keyof typeof features;
