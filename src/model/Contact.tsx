export class Contact {
   id: number;
   name: string;
   email: string;
   mobile: string;
   landLine: string;
   webSite: string;
   address: string;
   
   constructor(args: any) {
      this.id = args.id;
      this.name = args.name;
      this.email = args.email;
      this.mobile = args.mobile;
      this.landLine = args.landLine;
      this.webSite = args.webSite;
      this.address = args.address;
   }
}