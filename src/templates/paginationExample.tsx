import { sanitize } from 'isomorphic-dompurify';
import type { Breakpoints, PaginatorLocation, Post } from '../../lib/types';
import Layout from '../components/layout';
import Paginator from '../components/paginator';
import Seo from '../components/seo';
import * as styles from './pagination.module.css';

const PaginationPostsExample = ({
	pageContext: { posts, postsPerPage, routing, breakpoints },
	location,
}: {
	pageContext: {
		posts: Post[];
		postsPerPage: number;
		routing: boolean;
		breakpoints: Breakpoints;
	};
	location: PaginatorLocation;
}) => {
	const RenderCurrentItems = ({ currentItems }: { currentItems: Post[] }) => {
		return (
			<>
				{currentItems?.length > 0 ? (
					currentItems.map((item) => {
						return (
							<article
								key={item.title}
								className={`${styles.item} flex flex-col leading-8 mb-10 p-3`}
							>
								<h2 className={`${styles.itemTitle} font-bold mb-2`}>
									{item.title}
								</h2>
								<div
									dangerouslySetInnerHTML={{ __html: sanitize(item.excerpt) }}
								/>
							</article>
						);
					})
				) : (
					<span>There are no items to display</span>
				)}
			</>
		);
	};

	return (
		<Layout>
			<div className={styles.container}>
				<section className={styles.content}>
					<h1 className={`${styles.title} font-extrabold my-10 mx-0`}>
						Pagination example
					</h1>
					<Paginator
						data={posts}
						itemsPerPage={postsPerPage}
						location={location}
						breakpoints={breakpoints}
						routing={routing}
						Component={RenderCurrentItems}
					/>
				</section>
			</div>
		</Layout>
	);
};

export default PaginationPostsExample;

export function Head() {
	return (
		<Seo
			title="Paginated Posts Example"
			description="An example page with paginated data."
		/>
	);
}
