import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import { SyntheticEvent } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButtonProps = {
	onChange: OnClick;
	state: boolean;
};

export const ArrowButton = (props: TArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, props.state && styles.container_open)}
			onClick={(e: SyntheticEvent) => {
				e.stopPropagation();
				props.onChange();
			}}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, props.state && styles.arrow_open)}
			/>
		</div>
	);
};
