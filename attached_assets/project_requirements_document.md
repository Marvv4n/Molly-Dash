# Project Requirements Document for MollyAI

## Project Overview

MollyAI is the ultimate AI-powered ad management platform designed specifically for Shopify merchants and other e-commerce businesses. The platform leverages cutting-edge AI and machine learning technologies to simplify and automate digital advertising campaigns. It seamlessly integrates with major ad networks such as Facebook, Google, TikTok, and Shopify Ads to provide users with actionable insights, real-time optimizations, and effortless campaign management. MollyAI transforms the complex processes of ad management into intuitive, streamlined operations, allowing merchants to focus more effectively on their core business functions.

The primary purpose of building MollyAI is to address the significant challenges faced by Shopify merchants in managing and optimizing ads across diverse platforms efficiently. The platform aims to maximize users’ return on advertising spend through AI-driven solutions, reducing the time and effort required for effective campaign management. The key success criteria for the project include the ability to automate campaign creation, optimization, and evaluation, alongside delivering significant cost-efficiencies and improvements in ad performance through precise, data-driven decisions.

## In-Scope vs. Out-of-Scope

**In-Scope:**

*   Automated campaign management with AI-enabled creative uploads and optimizations.
*   AI-powered personalization for tailored recommendations in targeting and budget allocations.
*   Advanced analytics with insights into customer demographics, purchasing trends, and competitor benchmarks.
*   Campaign prediction models for forecasting potential performance metrics.
*   Seamless ad lifecycle management from creative upload to performance monitoring.
*   Comprehensive reporting and alert systems for campaign comparisons and performance deviations.
*   Integration with Shopify for product insights, ad creation, and subscription management.
*   Terminal commands feature for natural language ad management commands.
*   Multi-tiered pricing plans with a 14-day free trial to encourage user adoption.

**Out-of-Scope:**

*   Different user roles and permissions beyond basic role functionalities in the initial release.
*   Advanced competitor analysis features or integrations with additional ad networks are planned for later phases.

## User Flow

A new user signs up for MollyAI through a simplified registration form available on the platform’s landing page, with options for using email or social media accounts. Upon signing in, users are welcomed to the dashboard, which distinctly divides into a left sidebar for navigation and a main content area highlighting key metrics and campaign statistics. The dashboard displays real-time analytics, a list of active campaigns, and personalized recommendations powered by the platform’s AI.

Users can easily access the campaign management section from the sidebar, where they can upload creatives like images and videos, and let MollyAI's AI optimize these assets for better engagement. From this interface, users can launch new campaigns with a few clicks across multiple ad platforms. MollyAI constantly updates performance analytics, sending alerts for any budget overruns or opportunities for improvements, ensuring users can swiftly adjust strategies as needed.

## Core Features

*   **Automated Campaign Management:** Upload ad creatives; AI optimizations and variations for A/B testing; Launch on multiple platforms.
*   **AI-Powered Personalization:** Adaptation to user-specific products; Personalized insights and recommendations; Historical performance analysis.
*   **Advanced Analytics:** Customer demographics and trends; Competitor benchmarking; Creative fatigue detection.
*   **Campaign Prediction Models:** Predictive analytics for ROAS, CTR; Budget efficiency scoring.
*   **Lifecycle Management:** From upload to launch and monitoring; Dayparting and seasonal optimizations.
*   **Reporting and Alerts:** Multi-channel comparisons; Instant alerts for deviations.
*   **Shopify Integration:** Product insights and automated dynamic ad creation.
*   **Terminal Commands:** Natural language processing for intuitive command input.

## Tech Stack & Tools

*   **Frontend:** React with Polaris for a consistent Shopify UI.
*   **Backend:** Node.js with Prisma for API development.
*   **Database:** Supabase/PostgreSQL for data management.
*   **AI Services:** OpenAI GPT API for natural language processing; Google Vertex AI for machine learning models.
*   **Hosting:** Initial hosting on Replit with custom domain integration.
*   **IDE:** Development environment facilitated by Replit.

## Non-Functional Requirements

*   **Performance:** Real-time data refresh rates every minute; Terminal commands response within seconds.
*   **Security:** SSL/TLS encryption for data in transit; Role-based access controls for data at rest.
*   **Compliance:** GDPR and CCPA compliance with user consent management.
*   **Usability:** Aligning with Shopify Polaris guidelines for UI consistency; Responsive design with options for dark mode.

## Constraints & Assumptions

*   Dependent on the availability and reliability of third-party APIs (e.g., Facebook, Google).
*   Assumes robust support from AI services (OpenAI, Google Vertex AI) for maintaining operational quality.
*   Assumes users will input data at specific intervals for optimal real-time analytics performance.

## Known Issues & Potential Pitfalls

*   **API Rate Limits:** Could impact real-time functionalities; consider caching strategies to mitigate.
*   **Platform Restrictions:** Changes in ad network policies or API access can affect operations; stay updated with compliance changes.
*   **Data Privacy Compliance:** Have clear protocols for handling data access and deletion requests to conform with regulations.

This PRD aims to provide crystal clear guidance for AI-assisted development of MollyAI, serving as the foundational reference for all technical documentation and development processes.
