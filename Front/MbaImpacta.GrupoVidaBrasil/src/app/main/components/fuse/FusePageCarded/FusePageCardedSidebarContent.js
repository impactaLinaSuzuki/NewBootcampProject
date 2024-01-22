import FuseScrollbars from '@fuse/core/FuseScrollbars';

function FusePageCardedSidebarContent({ content }) {
	return (
		<FuseScrollbars ref={null} enable={false}>
			{!!content && <div className="FusePageCarded-sidebarContent">{content}</div>}
		</FuseScrollbars>
	);
}

export default FusePageCardedSidebarContent;
