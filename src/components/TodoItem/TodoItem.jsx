import { Button } from '../../components';
import style from './TodoItem.module.css';

import { ImCheckmark, ImCheckmark2 } from 'react-icons/im';
import { Link } from 'react-router';

export const TodoItem = ({ item, handleCompletedTask }) => {
	return (
		<>
			<li
				className={
					item.completed ? `${style['list__item']} ${style['list__item-completed']}` : style['list__item']
				}
			>
				<div className={style['list__item-title']}>
					<Link to={`/task/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
						{item.title}
					</Link>
				</div>

				<div>
					<Button
						text={
							!item.completed ? (
								<ImCheckmark2 />
							) : (
								<span style={{ color: 'green', fontSize: '16px', fontWeight: '500' }}>
									<ImCheckmark />
								</span>
							)
						}
						type="button"
						onClick={handleCompletedTask.bind(null, item.id)}
					/>
				</div>
			</li>
		</>
	);
};
