import { useRef, forwardRef, ReactNode } from "react";
import { FusePageCarded } from "../fuse/FusePageCarded";

interface IPageCardedProps {
  header?: ReactNode;
  content?: ReactNode;
  contentToolbar?: ReactNode;
  rightSidebarContent?: ReactNode;
  leftSidebarContent?: ReactNode;
  noPadding?: boolean;
  headerHeight?: number;
}

const PageCarded = forwardRef<any, IPageCardedProps>(
  (
    {
      header,
      content,
      contentToolbar,
      rightSidebarContent,
      leftSidebarContent,
      noPadding,
      headerHeight = 50,
    },
    ref
  ) => {
    const pageLayout = useRef(null);

    return (
      <FusePageCarded
        ref={ref || pageLayout}
        header={header}
        content={content}
        contentToolbar={contentToolbar}
        rightSidebarContent={rightSidebarContent}
        leftSidebarContent={leftSidebarContent}
        rightSidebarVariant="temporary"
        leftSidebarVariant="temporary"
        scroll="content"
        noPadding={noPadding}
        headerHeight={headerHeight}
      />
    );
  }
);

export default PageCarded;
