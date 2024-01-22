import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { forwardRef, memo, useImperativeHandle, useRef, useState, useCallback, ReactNode } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import FusePageCardedHeader from './FusePageCardedHeader';
import FusePageCardedSidebar from './FusePageCardedSidebar';

const drawerWidth = 240;
const HEADER_HEIGHT = 50;
const toolbarHeight = 60;

interface IRootProps {
	headerheight?: number;
	scroll?: string;
	leftsidebarwidth?: number;
	rightsidebarwidth?: number;
}

const Root = styled('div')<IRootProps>(({ theme, ...props }) => ({
	display: 'flex',
	flexDirection: 'column',
	minWidth: 0,
	minHeight: '100%',
	position: 'relative',
	flex: '1 1 auto',
	width: '100%',
	height: '100%',
	backgroundColor: theme.palette.background.default,

	'& .FusePageCarded-scroll-content': {
		height: '100%',
	},

	'& .FusePageCarded-wrapper': {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 auto',
		zIndex: 2,
		maxWidth: '100%',
		minWidth: 0,
		height: '100%',
		backgroundColor: theme.palette.background.default,
	},

	'& .FusePageCarded-header': {
		height: props.headerheight || HEADER_HEIGHT,
		minHeight: props.headerheight || HEADER_HEIGHT,
	},

	'& .FusePageCarded-contentWrapper': {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 auto',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		zIndex: 9999,
	},

	'& .FusePageCarded-toolbar': {
		height: toolbarHeight,
		minHeight: toolbarHeight,
		display: 'flex',
		alignItems: 'center',
		borderBottom: `1px solid ${theme.palette.divider}`,
	},

	'& .FusePageCarded-content': {
		flex: '1 1 auto',
		height: '100%',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
	},

	'& .FusePageCarded-sidebarWrapper': {
		overflow: 'hidden',
		backgroundColor: 'transparent',
		position: 'absolute',
		width: drawerWidth,
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				position: 'relative',
				marginLeft: 0,
				marginRight: 0,
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				'&.closed': {
					transition: theme.transitions.create('margin', {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen,
					}),

					'&.FusePageCarded-leftSidebar': {
						marginLeft: -drawerWidth,
					},
					'&.FusePageCarded-rightSidebar': {
						marginRight: -drawerWidth,
					},
				},
			},
		},
	},

	'& .FusePageCarded-sidebar': {
		position: 'absolute',
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,

		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				position: 'relative',
			},
		},
		width: drawerWidth,
		height: '100%',
	},

	'& .FusePageCarded-leftSidebar': {
		width: drawerWidth,

		[theme.breakpoints.up('lg')]: {
			// borderRight: `1px solid ${theme.palette.divider}`,
			// borderLeft: 0,
		},
	},

	'& .FusePageCarded-rightSidebar': {
		width: drawerWidth,

		[theme.breakpoints.up('lg')]: {
			// borderLeft: `1px solid ${theme.palette.divider}`,
			// borderRight: 0,
		},
	},

	'& .FusePageCarded-sidebarHeader': {
		height: props.headerheight || HEADER_HEIGHT,
		minHeight: props.headerheight || HEADER_HEIGHT,
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.primary.contrastText,
	},

	'& .FusePageCarded-sidebarHeaderInnerSidebar': {
		backgroundColor: 'transparent',
		color: 'inherit',
		height: 'auto',
		minHeight: 'auto',
	},

	'& .FusePageCarded-sidebarContent': {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100%',
	},

	'& .FusePageCarded-backdrop': {
		position: 'absolute',
	},
}));

interface FusePageCardedProps {
	leftSidebarHeader?: ReactNode;
	leftSidebarContent?: ReactNode;
	leftSidebarVariant?: string;
	rightSidebarContent?: ReactNode;
	rightSidebarVariant?: string;
	header?: ReactNode;
	content?: ReactNode;
	contentToolbar?: ReactNode;
	scroll?: 'normal' | 'page' | 'content';
	leftSidebarOpen?: boolean;
	rightSidebarOpen?: boolean;
	leftSidebarWidth?: number;
	rightSidebarWidth?: number;
	rightSidebarOnClose?: (val?: boolean) => void;
	leftSidebarOnClose?: (val?: boolean) => void;
	noPadding?: boolean;
	headerHeight?: number;
	className?: string;
}

const FusePageCarded = forwardRef<any, FusePageCardedProps>(
	(
		{ scroll = 'page', rightSidebarWidth = 240, leftSidebarWidth = 240, headerHeight = HEADER_HEIGHT, ...props },
		ref
	) => {
		const leftSidebarRef = useRef<any | null>(null);
		const rightSidebarRef = useRef<any | null>(null);
		const rootRef = useRef(null);

		const [openRightSidebar, setOpenRightSidebar] = useState(false);

		const toggleRightSidebar = useCallback((val?: boolean) => {
			if (!rightSidebarRef || !rightSidebarRef.current) return;

			rightSidebarRef.current.toggleSidebar(!!val);
			setOpenRightSidebar(prevState => !prevState);
		}, []);

		useImperativeHandle(ref, () => ({
			rootRef,
			toggleLeftSidebar: (val: boolean) => {
				leftSidebarRef.current.toggleSidebar(val);
			},
			toggleRightSidebar: toggleRightSidebar,
		}));

		return (
			<>
				<GlobalStyles
					styles={() => ({
						...(scroll !== 'page' && {
							'#fuse-toolbar': {
								position: 'static',
							},
							'#fuse-footer': {
								position: 'static',
							},
						}),
						...(scroll === 'page' && {
							'#fuse-toolbar': {
								position: 'sticky',
								top: 0,
							},
							'#fuse-footer': {
								position: 'sticky',
								bottom: 0,
							},
						}),
					})}
				/>
				<Root
					className={clsx('FusePageCarded-root p-0 m-0', `FusePageCarded-scroll-${scroll}`, props.className)}
					ref={rootRef}
					scroll={scroll}
					leftsidebarwidth={drawerWidth}
					rightsidebarwidth={drawerWidth}
					headerheight={headerHeight}
				>
					{props.header && <FusePageCardedHeader header={props.header} noPadding={props.noPadding} />}

					<div className="flex flex-auto flex-col h-full relative overflow-hidden">
						<div className="FusePageCarded-wrapper">
							{props.leftSidebarContent && (
								<FusePageCardedSidebar
									position="left"
									content={props.leftSidebarContent}
									variant={props.leftSidebarVariant || 'permanent'}
									ref={leftSidebarRef}
									rootRef={rootRef}
									open={props.leftSidebarOpen}
									onClose={props.leftSidebarOnClose}
								/>
							)}

							{props.contentToolbar && (
								<div className={clsx('FusePageCarded-toolbar', !props.noPadding && 'p-8 pt-10 mb-4')}>
									{props.contentToolbar}
								</div>
							)}

							<div className={clsx('FusePageCarded-contentWrapper', !props.noPadding && 'p-2')}>
								{props.content && (
									<div
										className={clsx(
											'FusePageCarded-content overflow-y-auto',
											!props.noPadding && 'p-1 m-8 mt-1'
										)}
									>
										{props.content}
									</div>
								)}
							</div>

							{props.rightSidebarContent && (
								<FusePageCardedSidebar
									position="right"
									content={props.rightSidebarContent}
									variant={props.rightSidebarVariant || 'permanent'}
									ref={rightSidebarRef}
									rootRef={rootRef}
									open={!!openRightSidebar}
									onClose={toggleRightSidebar}
								/>
							)}
						</div>
					</div>
				</Root>
			</>
		);
	}
);

export default memo(styled(FusePageCarded)``);
