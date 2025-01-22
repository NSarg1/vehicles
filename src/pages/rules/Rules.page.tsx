import PageWrapper from 'src/components/page-wrapper/PageWrapper';

import styles from './rules.module.scss';

const RulesPage = () => {
  return (
    <PageWrapper>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>Կանոններ</h1>
          <ul className={styles.rules}>
            <li>Եթե լիցքավորիչը ազատ է, միացրեք:</li>
            <li>Բոլոր մնացածը հերթագրվում են:</li>
            <li>Ով վերջացնում է, տեղեկացնում է հերթում հաջորդ գտնվողին և ջնջում իր մեքենան հերթից:</li>
          </ul>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RulesPage;
