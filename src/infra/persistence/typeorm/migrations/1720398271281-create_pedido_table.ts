import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePedidoTable1720398271281 implements MigrationInterface {
    name = 'CreatePedidoTable1720398271281'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        'CREATE TABLE `Pedido` (' +
        '  `id` int NOT NULL, ' +
        '  `consumidor_id` varchar(36) NULL, ' +
        '  `status` varchar(20) NOT NULL, ' +
        '  `itens` json NOT NULL, ' +
        '  `created_at` datetime NOT NULL, ' +
        '  `updated_at` datetime NOT NULL, ' +

        '  INDEX `IDX_7c6d2423ee562c77254361ac75` (`consumidor_id`), ' +

        '  PRIMARY KEY (`id`)' +
        ') ENGINE=InnoDB'
      )
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP INDEX `IDX_7c6d2423ee562c77254361ac75` ON `Pedido`')
      await queryRunner.query('DROP TABLE `Pedido`')
    }
}
