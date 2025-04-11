import Hashids from 'hashids'

export class HashService {
    constructor(private orderHash:Hashids) {
        const salt = "d94be94a34dd36e81bcbdd2f214adee26ed1fc92f925c9a117e9be39d92052f9t";
        this.orderHash = new Hashids(salt, 12);
    }

    encodeOrderHash(orderNumber: number): string {
        return this.orderHash.encode(orderNumber);
    }

    decodeOrderHash(hash: string): number | null {
        const decoded = this.orderHash.decode(hash);
        return decoded.length ? Number(decoded[0]) : null;
    }


}

