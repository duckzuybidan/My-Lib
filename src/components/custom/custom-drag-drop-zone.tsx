import { cn } from "@/lib/utils";
import React, { createContext, useState, ReactNode, useMemo, use } from "react";

interface IDragDropContext {
  mode: "sort" | "swap";
}
interface IDragDropBodyContext {
  moveItem: (fromIndex: number, toIndex: number) => void;
}
interface IDragDropZoneProps {
  children: React.ReactNode;
  mode?: "sort" | "swap";
  className?: string;
  style?: React.CSSProperties;
}
interface IItemProps {
  children?: ReactNode;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}
interface IBodyProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
interface IItemData {
  id: string;
  element: React.ReactElement;
}
interface IFooterProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
interface IHeaderProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
interface IDragDropZoneComponent extends React.FC<IDragDropZoneProps> {
  Header: React.FC<IHeaderProps>;
  Body: IBodyComponent;
  Footer: React.FC<IFooterProps>;
}
interface IBodyComponent extends React.FC<IBodyProps> {
  Item: React.FC<IItemProps>;
}
const DragDropContext = createContext<IDragDropContext | null>(null);
const DragDropBodyContext = createContext<IDragDropBodyContext | null>(null);

const useDragDropContext = ({ errorMessage }: { errorMessage: string }): IDragDropContext => {
  const context = use(DragDropContext);
  if (!context) {
    throw new Error(errorMessage);
  }
  return context;
};

const useDragDropBodyContext = ({ errorMessage }: { errorMessage: string }): IDragDropBodyContext => {
  const context = use(DragDropBodyContext);
  if (!context) {
    throw new Error(errorMessage);
  }
  return context;
};


const DragDropZone: React.FC<IDragDropZoneProps> = ({
  children,
  mode = "sort",
  className,
  style,
}) => {
  const header: React.ReactNode = useMemo(
    () =>
      React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === Header
      ) || null,
    [children]
  );
  const body: React.ReactNode = useMemo(
    () =>
      React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === Body
      ) || null,
    [children]
  );
  const footer: React.ReactNode = useMemo(
    () =>
      React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === Footer
      ) || null,
    [children]
  );

  return (
    <DragDropContext.Provider value={{ mode }}>
      <div className={cn("", className)} style={style}>
        {header && <>{header}</>}
        {body && <>{body}</>}
        {footer && <>{footer}</>}
      </div>
    </DragDropContext.Provider>
  );
};
/**
 * `Item` represents an individual draggable item within the `DragDropZone.Body`. 
 * It is rendered within the `Body` component and provides drag-and-drop functionality, allowing the item to be moved 
 * or swapped based on the selected mode ("sort" or "swap").
 *
 * @param {React.ReactNode} [children] - The content to be displayed inside the item.
 * @param {number} index - The index of the item within the `Body` component, used to track the item's position.
 * @param {string} [className] - Optional class name for custom styling.
 * @param {React.CSSProperties} [style] - Optional inline styles to customize the appearance of the item.
 * 
 * @returns {JSX.Element} The `Item` component that represents an individual draggable item.
 * 
 * @example
 * ```tsx
 * <DragDropZone.Body>
 *   <DragDropZone.Body.Item index={0}>Item 1</DragDropZone.Body.Item>
 *   <DragDropZone.Body.Item index={1}>Item 2</DragDropZone.Body.Item>
 * </DragDropZone.Body>
 * ```
 */
const Item: React.FC<IItemProps> = ({ children, index, className, style }) => {
  const { moveItem } = useDragDropBodyContext({
    errorMessage: "CustomDragDropZoneItem must be used within a CustomDragDropZone",
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (!isNaN(fromIndex) && fromIndex !== index) {
      moveItem(fromIndex, index);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cn("", className)}
      style={style}
    >
      {children}
    </div>
  );
};
/**
 * `Header` is a component within the `DragDropZone` that represents the header section of the drag-and-drop zone.
 * It can contain any content, such as titles, buttons, or other elements, and is displayed at the top of the `DragDropZone`.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the header.
 * @param {string} [className] - Optional class name for custom styling.
 * @param {React.CSSProperties} [style] - Optional inline styles to customize the appearance of the header.
 * 
 * @returns {JSX.Element} The `Header` component that will be rendered at the top of the `DragDropZone`.
 * 
 * @example
 * ```tsx
 * <DragDropZone.Header>
 *   <h2>My Custom Header</h2>
 * </DragDropZone.Header>
 * ```
 */
const Header: React.FC<IHeaderProps> = ({ children, className, style }) => {
  useDragDropContext({
    errorMessage: "CustomDragDropZoneHeader must be used within a CustomDragDropZone",
  });
  return (
    <div className={cn("", className)} style={style}>
      {children}
    </div>
  );
};
/**
 * `Footer` is a component within the `DragDropZone` that represents the footer section of the drag-and-drop zone.
 * It can contain any content, such as buttons, links, or other elements, and is displayed at the bottom of the `DragDropZone`.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the footer.
 * @param {string} [className] - Optional class name for custom styling.
 * @param {React.CSSProperties} [style] - Optional inline styles to customize the appearance of the footer.
 * 
 * @returns {JSX.Element} The `Footer` component that will be rendered at the bottom of the `DragDropZone`.
 * 
 * @example
 * ```tsx
 * <DragDropZone.Footer>
 *   <button>Footer Button</button>
 * </DragDropZone.Footer>
 * ```
 */
const Footer: React.FC<IFooterProps> = ({ children, className, style }) => {
  useDragDropContext({
    errorMessage: "CustomDragDropZoneFooter must be used within a CustomDragDropZone",
  });
  return (
    <div className={cn("", className)} style={style}>
      {children}
    </div>
  );
};


/**
 * `Body` is the main content area within the `DragDropZone` that contains the draggable items. 
 * It provides the drag-and-drop functionality for sorting or swapping items based on the `mode` set in the `DragDropZone`.
 *
 * @param {React.ReactNode} children - The content (draggable items) to be rendered inside the body.
 * @param {string} [className] - Optional class name for custom styling.
 * @param {React.CSSProperties} [style] - Optional inline styles to customize the appearance of the body.
 * 
 * @returns {JSX.Element} The `Body` component that will render the draggable items and manage their order.
 * 
 * @example
 * ```tsx
 * <DragDropZone.Body>
 *   <DragDropZone.Body.Item index={0}>Item 1</DragDropZone.Body.Item>
 *   <DragDropZone.Body.Item index={1}>Item 2</DragDropZone.Body.Item>
 * </DragDropZone.Body>
 * ```
 */
const Body: React.FC<IBodyProps> = ({ children, className, style }) => {
  const { mode } = useDragDropContext({
    errorMessage: "CustomDragDropZoneBody must be used within a CustomDragDropZone",
  });

  const initialItems: IItemData[] = (React.Children.toArray(children)
    .filter((child): child is React.ReactElement => React.isValidElement(child) && child.type === Item)
    .map((child) => ({
      id: (child.key ?? crypto.randomUUID()).toString(),
      element: child,
    })));

  const [itemOrder, setItemOrder] = useState<string[]>(initialItems.map((item) => item.id));

  const itemMap = useMemo(() => {
    const map = new Map<string, React.ReactElement>();
    for (const item of initialItems) {
      map.set(item.id, item.element);
    }
    return map;
  }, [children]);

  const moveItem = (fromIndex: number, toIndex: number) => {
    setItemOrder((prevOrder) => {
      const updatedOrder = [...prevOrder];
      if (mode === "sort") {
        const [movedId] = updatedOrder.splice(fromIndex, 1);
        updatedOrder.splice(toIndex, 0, movedId);
      } else if (mode === "swap") {
        const temp = updatedOrder[fromIndex];
        updatedOrder[fromIndex] = updatedOrder[toIndex];
        updatedOrder[toIndex] = temp;
      }
      return updatedOrder;
    });
  };

  return (
    <DragDropBodyContext.Provider value={{ moveItem }}>
      <div className={cn("", className)} style={style}>
        {itemOrder.map((id, index) => {
          const element = itemMap.get(id);
          if (!element) return null;
          return (
            <React.Fragment key={id}>
              {React.cloneElement(element as React.ReactElement<{ index: number }>, { index })}
            </React.Fragment>
          );
        })}
      </div>
    </DragDropBodyContext.Provider>
  );
};
const BodyWithItem = Body as IBodyComponent;
BodyWithItem.Item = Item;
/**
 * `DragDropZone` is a container component that provides drag-and-drop functionality.
 * It accepts `Header`, `Body`, and `Footer` components and enables items within the `Body` to be dragged and dropped.
 * The mode of the drag-and-drop operation can be either "sort" (for reordering items) or "swap" (for swapping items).
 *
 * @param {React.ReactNode} children - The content to be rendered inside the `DragDropZone`, which can include `Header`, `Body`, and `Footer`.
 * @param {("sort" | "swap")} [mode="sort"] - The mode for drag-and-drop behavior. "sort" allows items to be reordered, while "swap" swaps the positions of two items.
 * @param {string} [className] - An optional class name for custom styling.
 * @param {React.CSSProperties} [style] - Optional inline styles to customize the appearance of the `DragDropZone`.
 * 
 * @returns {JSX.Element} The `DragDropZone` component that wraps the `Header`, `Body`, and `Footer` components and provides drag-and-drop functionality.
 * 
 * @example
 * ```tsx
 * <DragDropZone mode="swap" className="custom-class">
 *   <DragDropZone.Header>
 *     <h2>Header Content</h2>
 *   </DragDropZone.Header>
 *   <DragDropZone.Body>
 *     <DragDropZone.Body.Item index={0}>Item 1</DragDropZone.Body.Item>
 *     <DragDropZone.Body.Item index={1}>Item 2</DragDropZone.Body.Item>
 *   </DragDropZone.Body>
 *   <DragDropZone.Footer>
 *     <button>Footer Button</button>
 *   </DragDropZone.Footer>
 * </DragDropZone>
 * ```
 */
const CustomDragDropZone = DragDropZone as IDragDropZoneComponent;
CustomDragDropZone.Header = Header;
CustomDragDropZone.Body = BodyWithItem;
CustomDragDropZone.Footer = Footer;


export default CustomDragDropZone;
