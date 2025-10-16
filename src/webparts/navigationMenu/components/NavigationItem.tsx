import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import styles from "./NavigationMenu.module.scss";
import { INavigationItem } from "../models/INavigationData";

// Props = what data this component receives from its parent
interface INavigationItemProps {
  item: INavigationItem; // One menu item
}

// This component displays a single link with an icon
const NavigationItem: React.FC<INavigationItemProps> = ({ item }) => {
  return (
    <a
      href={item.url}
      className={styles.navItem}
      target="_blank" // Opens in new tab
      rel="noopener noreferrer" // Security best practice
    >
      <Icon iconName={item.icon} className={styles.navIcon} />
      <span className={styles.navText}>{item.name}</span>
    </a>
  );
};

export default NavigationItem;
