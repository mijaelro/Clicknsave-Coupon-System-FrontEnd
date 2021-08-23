import "./EmptyView.css";

interface EmptyViewProps {
	msg: string;
};

const EmptyView=(props: EmptyViewProps): JSX.Element=> {
    return (
        <div className="EmptyView">
            <h2 id="niceTitle2">{props.msg}</h2>
			<img alt ="empty view"src="https://media.giphy.com/media/xUySTWxyhBQCk41ZAs/giphy.gif"/>
        </div>
    );
};

export default EmptyView;