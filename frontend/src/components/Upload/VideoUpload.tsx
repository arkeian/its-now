interface Props {
    url: string;
}

// Simple reusable video embed that assumes the URL is already embeddable
// (e.g. a YouTube embed URL). It uses the same media-frame styles as images.
const VideoEmbed = ({ url }: Props) => {
    if (!url) return null;

    return (
        <div className="media-frame mb-3">
            <iframe
                className="media-video"
                src={url}
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
};

export default VideoEmbed;
