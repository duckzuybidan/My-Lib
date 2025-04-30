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
const CustomDragDropZone = DragDropZone as IDragDropZoneComponent;
CustomDragDropZone.Header = Header;
CustomDragDropZone.Body = BodyWithItem;
CustomDragDropZone.Footer = Footer;

export default CustomDragDropZone;
