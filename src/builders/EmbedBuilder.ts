import { EmbedTypes } from "../types";
import { BasicBuilder } from "./BasicBuilder";
import type { EmbedData, EmbedFieldData, EmbedImageData, EmbedVideoData, EmbedFooterData, EmbedAuthorData, EmbedProviderData, EmbedThumbnailData } from "../types/channel";

export class EmbedBuilder extends BasicBuilder<EmbedData> {
	/**
     * Create embed data by the constructor
     * @param {EmbedData} data - Data to be set
     * @see https://discord.com/developers/docs/resources/channel#embed-object
     */

	constructor(data?: EmbedData) {
		super(data);

		this.data.type = EmbedTypes.Rich;
	}

	/**
     * Set the embed color
     * @param {number} color - The color in hex format, e.g. 0x1a
     * @returns {this}
     */

	setColor(color: number): this {
		this.data.color = color;

		return this;
	}

	/**
     * Set the embed description
     * @param {string} description - The description
     * @returns {this}
     */

	setDescription(description: string): this {
		this.data.description = description;

		return this;
	}

	/**
     * Set the embed title
     * @param {string} title - The title
     * @returns {this}
     */

	setTitle(title: string): this {
		this.data.title = title;

		return this;
	}

	/**
     * Set the embed URL
     * @param {string} URL - The URL
     * @returns {this}
     */

	setURL(URL: string): this {
		this.data.url = URL;

		return this;
	}

	/**
     * Set the embed timestamp
     * @param {Date | number} timestamp - The timestamp
     * @returns 
     */

	setTimestamp(timestamp: Date | number): this {
		this.data.timestamp = timestamp instanceof Date ? timestamp.getTime() : timestamp;

		return this;
	}

	/**
     * Set the embed footer
     * @param {EmbedFooterData | string} footer - The footer
     * @returns {this}
     */

	setFooter(footer: EmbedFooterData | string): this {
		this.data.footer = typeof footer === "string" ? { text: footer } : footer;

		return this;
	}

	/**
     * Set the embed image
     * @param {EmbedImageData | string} image - The image
     * @returns {this}
     */

	setImage(image: EmbedImageData | string): this {
		this.data.image = typeof image === "string" ? { url: image } : image;

		return this;
	}
	setThumbail(thumbnail: EmbedThumbnailData | string): this {
		this.data.thumbnail = typeof thumbnail === "string" ? { url: thumbnail } : thumbnail;

		return this;
	}

	/**
     * Set the embed video
     * @param {EmbedVideoData | string} video - The video
     * @returns {this}
     */

	setVideo(video: EmbedVideoData | string): this {
		this.data.video = typeof video === "string" ? { url: video } : video;

		return this;
	}

	/**
     * Set the embed author
     * @param {EmbedAuthorData | string} author - The author data
     * @returns {this}
     */

	setAuthor(author: EmbedAuthorData | string): this {
		this.data.author = typeof author === "string" ? { name: author } : author;

		return this;
	}

	/**
     * Add fields to the embed fields
     * @param {EmbedFieldData[]} fields - The fields
     * @returns {this}
     */

	addFields(...fields: Array<EmbedFieldData>): this {
		this.data.fields ? this.data.fields.push(...fields) : this.data.fields = fields;

		return this;
	}

	/**
     * Set the embed fields
     * @param {EmbedFieldData[]} fields - The fields
     * @returns {this}
     */

	setFields(...fields: Array<EmbedFieldData>): this {
		this.data.fields = fields;

		return this;
	}

	/**
     * Set the embed type
     * @param {EmbedTypes} type - The type
     * @returns {this}
     */

	setType(type: EmbedTypes): this {
		this.data.type = type;

		return this;
	}

	/**
     * Set the embed provider
     * @param {EmbedProviderData | string} provider - The provider
     * @returns {this}
     */

	setProvider(provider: EmbedProviderData | string): this {
		this.data.provider = typeof provider === "string" ? { name: provider } : provider;

		return this;
	}

	/** Maximum embed title length */

	static MaxTitleLength = 256;

	/** Maximum embed fields length */

	static MaxFieldsLength = 25;

	/** Maximum embed field name length */

	static MaxFieldNameLength = 256;

	/** Maximum embed author name length */

	static MaxAuthorNameLength = 256;

	/** Maximum embed field value length */

	static MaxFieldValueLength = 1024;

	/** Maximum embed footer text length */

	static MaxFooterTextLength = 2048;

	/** Maximum embed description length */

	static MaxDescriptionLength = 4096;
}