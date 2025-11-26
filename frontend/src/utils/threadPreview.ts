export interface ThreadPreview {
    html: string;
}

export const buildThreadPreview = (bodyHtml: string, maxLines: number = 4): ThreadPreview => {
    if (!bodyHtml) {
        return { html: "" };
    }

    const container = document.createElement("div");
    container.innerHTML = bodyHtml;

    const paragraphs: HTMLElement[] = Array.from(container.querySelectorAll("p"));
    const images: HTMLImageElement[] = Array.from(container.querySelectorAll("img"));
    const videos: HTMLVideoElement[] = Array.from(container.querySelectorAll("video"));

    const firstImage = images[0] || null;
    const firstVideo = videos[0] || null;

    const previewContainer = document.createElement("div");

    let remainingLines = maxLines;

    const appendParagraph = (p: HTMLElement) => {
        if (remainingLines <= 0) return;
        const clone = p.cloneNode(true) as HTMLElement;
        clone.classList.add("thread-preview-text");
        previewContainer.appendChild(clone);
        remainingLines -= maxLines; // simple approximation per paragraph
    };

    const appendMedia = (el: HTMLElement) => {
        const wrapper = document.createElement("div");
        wrapper.className = "media-frame";
        const clone = el.cloneNode(true) as HTMLElement;
        if (clone.tagName.toLowerCase() === "img") {
            clone.classList.add("media-img");
        } else {
            clone.classList.add("media-video");
        }
        wrapper.appendChild(clone);
        previewContainer.appendChild(wrapper);
    };

    // Case 1: video first in document order
    if (firstVideo && (!firstImage || firstVideo.compareDocumentPosition(firstImage) & Node.DOCUMENT_POSITION_FOLLOWING)) {
        const textBeforeVideo = paragraphs.filter((p) => p.compareDocumentPosition(firstVideo) & Node.DOCUMENT_POSITION_FOLLOWING);
        for (const p of textBeforeVideo) {
            appendParagraph(p);
            if (remainingLines <= 0) break;
        }
        appendMedia(firstVideo);
        return { html: previewContainer.innerHTML };
    }

    // Case 2: image first in document order
    if (firstImage) {
        const textBeforeImage = paragraphs.filter((p) => p.compareDocumentPosition(firstImage) & Node.DOCUMENT_POSITION_FOLLOWING);
        for (const p of textBeforeImage) {
            appendParagraph(p);
            if (remainingLines <= 0) break;
        }
        appendMedia(firstImage);
        return { html: previewContainer.innerHTML };
    }

    // Case 3: text-only – take first paragraph or approximate lines from combined text
    if (paragraphs.length > 0) {
        appendParagraph(paragraphs[0]);
        return { html: previewContainer.innerHTML };
    }

    // Fallback: return original body
    return { html: bodyHtml };
};
