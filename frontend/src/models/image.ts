export interface IComment {
	text: string
	author: string
	authorName: string
	_id: string
}

export interface IImage {
	_id: number
	url: string
	comments: IComment[] | []
}

export interface IImageRes {
	page: number
	per_page: number
	photos: IImage[]
	total_results: string
	next_page: string
}
