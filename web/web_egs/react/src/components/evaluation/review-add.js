import React from 'react'
import {connect} from 'react-redux'
import {setHeader} from '../../actions/main'
import {URL} from '../../config'
import {insertReview} from "../../actions/evaluation/review"
import Rate from 'antd/lib/rate'
import Icon from 'antd/lib/icon'
import Radio from 'antd/lib/radio'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import InputNumber from 'antd/lib/input-number'

const RadioGroup = Radio.Group

@connect((store) => {
    return {
        lang: store.language.data
    }
})
export default class ReviewAdd extends React.Component {
    constructor() {
        super()
        this.checkmark = '\u2713'
        this.nothing = '\u0020\u0020\u0020'
        this.post = {}
        this.student = [
            {
                head: 'เพศ',
                name: 'gender',
                list: ['ชาย', 'หญิง']
            },
            {
                head: 'อายุ',
                name: 'age',
                list: ['๒๐-๓๐ ปี', '๓๑-๔๐ ปี', '๔๑-๕๐ ปี', 'มากกว่า ๕๐ ปี']
            },
            {
                head: 'ระดับการศึกษา',
                name: 'degree',
                list: ['ปริญญาโท', 'ปริญญาเอก']
            },
            {
                head: 'สาขาวิชา',
                name: 'branch',
                list: ['วิทยาการคอมพิวเตอร์', 'เทคโนโลยีสารสนเทศ', 'การรับรู้ระยะไกลและระบบสารสนเทศภูมิศาสตร์']
            },
            {
                head: 'กำลังศึกษาชั้นปีที่',
                name: 'year',
                list: ['ปี 1', 'ปี 2', 'ปี 3', 'ปี 4']
            },
            {
                head: 'ภาคการศึกษา',
                name: 'semester',
                list: ['ต้น', 'ปลาย']
            },
            {
                head: 'ปีการศึกษา',
                name: 'enroll',
                list: [0],
                year: 1
            }
        ]
        this.list = [
            {
                head: 'หลักสูตร',
                list: [
                    'การจัดการศึกษาสอดคล้องกับปรัชญาและวัตถุประสงค์ของหลักสูตร',
                    'มีการจัดแผนการศึกษาตลอดหลักสูตรอย่างชัดเจน',
                    'มีปฏิทินการศึกษาและโปรแกรมการศึกษาแต่ละภาคการศึกษาอย่างชัดเจน',
                    'หลักสูตรมีความทันสมัยสอดคล้องกับความต้องการของตลาดแรงงาน',
                    'วิชาเรียนมีความเหมาะสมและสอดคล้องกับความต้องการของนักศึกษา'
                ]
            },
            {
                head: 'อาจารย์ผู้สอน',
                list: [
                    'อาจารย์มีคุณวุฒิและประสบการณ์เหมาะสมกับรายวิชาที่สอน',
                    'อาจารย์สอน เนื้อหา ตรงตามวัตถุประสงค์ โดยใช้วิธีการที่หลากหลาย',
                    'อาจารย์สนับสนุนส่งเสริมให้นักศึกษาเรียนรู้ และพัฒนาตนเองอย่างสม่ำเสมอ',
                    'อาจารย์ให้คำปรึกษาด้านวิชาการและการพัฒนานักศึกษาได้อย่างเหมาะสม',
                    'อาจารย์เป็นผู้มีคุณธรรม และจิตสำนึกในความเป็นครู'
                ]
            },
            {
                head: 'สภาพแวดล้อมการเรียนรู้',
                list: [
                    'ห้องเรียนมีอุปกรณ์เหมาะสม เอื้อต่อการเรียนรู้ และเพียงพอต่อนักศึกษา',
                    'ห้องปฏิบัติการมีอุปกรณ์เหมาะสม เอื้อต่อการเรียนรู้ และเพียงพอต่อนักศึกษา',
                    'ระบบบริการสารสนเทศเหมาะสม เอื้อต่อการเรียนรู้และเพียงพอต่อนักศึกษา'
                ]
            },
            {
                head: 'การจัดการเรียนการสอน',
                list: [
                    'การจัดการเรียนการสอนสอดคล้องกับลักษณะวิชาและวัตถุประสงค์การเรียนรู้',
                    'การใช้สื่อประกอบการสอนอย่างเหมาะสม',
                    'วิธีการสอนส่งเสริมให้นักศึกษาได้ประยุกต์แนวคิดศาสตร์ทางวิชาชีพและ/หรือศาสตร์ที่เกี่ยวข้องในการพัฒนาการเรียนรู้',
                    'มีการใช้เทคโนโลยีสารสนเทศประกอบการเรียนการสอน',
                    'การจัดการเรียนการสอนที่ส่งเสริมทักษะทางภาษาสากล'
                ]
            },
            {
                head: 'การวัดและประเมินผล',
                list: [
                    'วิธีการวัดประเมินผลสอดคล้องกับวัตถุประสงค์ และกิจกรรมการเรียนการสอน',
                    'การวัดและประเมินผลเป็นไปตามระเบียบกฎเกณฑ์ และข้อตกลง ที่กำหนดไว้ล่วงหน้า'
                ]
            },
            {
                head: 'การเรียนรู้ตลอดหลักสูตรได้พัฒนาคุณลักษณะของนักศึกษา',
                list: [
                    'ด้านคุณธรรม จริยธรรม',
                    'ด้านความรู้',
                    'ด้านทักษะทางปัญญา',
                    'ด้านความสัมพันธ์ระหว่างบุคคลและความรับผิดชอบ',
                    'ด้านทักษะการวิเคราะห์เชิงตัวเลข การสื่อสาร และการใช้เทคโนโลยีสารสนเทศ'
                ]
            }
        ]
        this.rate = ['น้อยที่สุด', 'น้อย', 'ปานกลาง', 'มาก', 'มากที่สุด']
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        // NOTE: check if formAdd still displayed
    }

    componentDidMount() {
        const {dispatch} = this.props
        // NOTE: fetch needed data
    }

    change(ev) {
        Object.keys(this.post).some((k) => {
            if (~k.indexOf(ev.target.name)) {
                if (k === `${ev.target.name}${ev.target.value}`)
                    this.post[k] = this.checkmark
                else
                    this.post[k] = this.nothing
            }
        })
    }

    changeText(name, value) {
        this.post[`${name}0`] = value
    }

    submit() {
        const {dispatch} = this.props
        let good = true
        Object.keys(this.post).map(key => {
            if (this.post[key] === null)
                good = false
        })
        if (good) {
            dispatch(insertReview(this.post, response => {
                if (response === 1)
                    window.location = `${URL.EGS_BASE}/#/review-list`
            }))
        } else {
            alert('not good bruh')
        }
    }

    default(name, index) {
        this.post[`${name}${index}`] = null
        return null
    }

    render() {
        const {calendars, lang} = this.props
        return (
            <Row>
                <Col span={24} style={{textAlign: 'center'}}>
                    <h3>ข้อมูลเบื้องต้นของนักศึกษา</h3>
                </Col>
                {
                    this.student.map((student, index1) =>
                        [
                            <Col sm={6} span={24} key={index1}>
                                <Col span={24}>
                                    {student.head}
                                </Col>
                                {
                                    student.year ? <InputNumber size="small" placeholder="year"
                                                                onChange={(value) => this.changeText(student.name, value)}
                                                                defaultValue={this.default(student.name, 0)}
                                                                maxLength={4}/> :
                                        <RadioGroup name={student.name} onChange={(ev) => this.change(ev)}>
                                            {
                                                student.list.map(
                                                    (list, index2) =>
                                                        <Col key={index2} span={24}>
                                                            <Radio value={index2}
                                                                   defaultChecked={this.default(student.name, index2)}>
                                                                {list}
                                                            </Radio>
                                                        </Col>
                                                )
                                            }
                                        </RadioGroup>
                                }
                            </Col>,
                            (index1 + 1) % 4 !== 0 || index1 === this.student.length - 1 ? null :
                                <Col key={index1 + '_'} span={24}/>
                        ]
                    )
                }
                <Col span={24} style={{textAlign: 'center'}}>
                    <h3>ความพึงพอใจต่อคุณภาพหลักสูตร</h3>
                </Col>
                <Col span={24}>
                    {
                        this.list.map(
                            (list, index1) =>
                                <Col key={index1} span={24} style={{textAlign: 'center'}}>
                                    <h4>{`${index1 + 1}. ${list.head}`}</h4>
                                    {list.list.map(
                                        (list_, index2) =>
                                            <Row key={index2}>
                                                <Col span={24}>
                                                    <h5>
                                                        {`(${index2 + 1}) ${list_}`}
                                                    </h5>
                                                </Col>
                                                <Col span={24}>
                                                    <RadioGroup name={`rate${index1}${index2}`}
                                                                onChange={(ev) => this.change(ev)}>
                                                        {
                                                            this.rate.map(
                                                                (rate, index3) =>
                                                                    <Radio key={index3} value={index3}
                                                                           defaultChecked={this.default(`rate${index1}${index2}`, index3)}>
                                                                        {rate}
                                                                    </Radio>
                                                            )
                                                        }
                                                    </RadioGroup>
                                                </Col>
                                                <Col span={24}>
                                                    <hr/>
                                                </Col>
                                            </Row>
                                    )}
                                </Col>
                        )
                    }
                </Col>
                <button onClick={() => this.submit()} class='btn btn-block btn-success'>OK</button>
            </Row>
        )
    }
}