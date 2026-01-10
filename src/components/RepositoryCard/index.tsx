import type { ReactNode } from 'react';
import styles from './styles.module.css';

export interface Repository {
  name: string;
  description: string;
  url: string;
  tags?: string[];
}

interface RepositoryCardProps {
  repo: Repository;
}

export default function RepositoryCard({ repo }: RepositoryCardProps): ReactNode {
  return (
    <div className={styles.card}>
      <a href={repo.url} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
        <h3 className={styles.repoName}>{repo.name}</h3>
        <p className={styles.description}>{repo.description}</p>
        {repo.tags && repo.tags.length > 0 && (
          <div className={styles.tags}>
            {repo.tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </a>
    </div>
  );
}
