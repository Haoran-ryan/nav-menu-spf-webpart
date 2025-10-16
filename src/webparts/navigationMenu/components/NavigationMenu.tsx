import * as React from "react";
import { useEffect, useState } from "react";
import styles from "./NavigationMenu.module.scss";
import { INavigationData } from "../models/INavigationData";
import NavigationGroup from "./NavigationGroup";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

// Update props to receive context from web part
export interface INavigationMenuProps {
  context: WebPartContext; // We need this to make SharePoint calls
}

const NavigationMenu: React.FC<INavigationMenuProps> = ({ context }) => {
  const [navData, setNavData] = useState<INavigationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        // Get the current site URL dynamically (no hardcoding!)
        const siteUrl = context.pageContext.web.absoluteUrl;

        // Construct the URL to your JSON file in SiteAssets
        const jsonUrl = `${siteUrl}/SiteAssets/navigationItems.json`;

        // Fetch the JSON file using SPHttpClient
        const response: SPHttpClientResponse = await context.spHttpClient.get(
          jsonUrl,
          SPHttpClient.configurations.v1
        );

        if (response.ok) {
          const data: INavigationData = await response.json();
          setNavData(data);
        } else {
          setError(
            `Failed to load navigation data. Status: ${response.status}`
          );
        }
      } catch (err) {
        console.error("Error loading navigation data:", err);
        setError(
          "Error loading navigation data. Please check if navigationItems.json exists in SiteAssets."
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadData();
  }, [context]);

  if (isLoading) {
    return <div className={styles.navigationMenu}>Loading navigation...</div>;
  }

  if (error) {
    return (
      <div className={styles.navigationMenu}>
        <div className={(styles as any).error}>{error}</div>
      </div>
    );
  }

  if (!navData) {
    return (
      <div className={styles.navigationMenu}>No navigation data available</div>
    );
  }

  return (
    <div className={styles.navigationMenu}>
      <div className={styles.container}>
        {navData.groups.map((group, index) => (
          <NavigationGroup key={index} group={group} />
        ))}
      </div>
    </div>
  );
};

export default NavigationMenu;
