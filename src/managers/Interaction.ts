import { IInteraction } from "../interfaces/IInteraction";

export class Interaction implements IInteraction {
  public readonly id: string;
  public readonly application_id: string;
  public readonly type: number;
  public readonly token: string;
  public readonly version: number;

  constructor(props: IInteraction) {
    this.id = props.id
    this.application_id = props.application_id
    this.type = props.type
    this.token = props.token
    this.version = props.version

    Object.assign(this, props);
  };
  
  reply() {
    
  };
};